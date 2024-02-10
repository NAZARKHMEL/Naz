import express from 'express';
import * as bodyParser from 'body-parser';
import * as bcrypt from 'bcrypt';
import conn from 'mssql';

const config = {
	user: 'admin0',
	password: 'azure_test_2024',
	server: 'nazarazureserver.database.windows.net',
	port: 1433,
	database: 'nazprosjekt',
	authentication: {
		type: 'default'
	},
	options: {
		encrypt: true
	}
}
var con = conn.connect(config)
var isRegistrert = "No";
var page = 1;
var maxpage = 0;
var prodcount = 0;
var prodarr = [];
var falsearr = [];
var finalprice = 0;
var chType = "";
export let name2 = "foobar";
export function modifyX( value ) { name2 = value; }

var router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static("images"));

import { diskStorage } from 'multer';

router.get("/", async function (request, response, next) {
	await conn.connect(config);
	chType = "Pizza"
	page = 1;
	var result = await conn.query`
	SELECT * FROM products WHERE type='Pizza'
  `;
	maxpage = result.recordset.length / 9;
	var arr = result.recordset.splice((page * 9) - 9, (page * 9));
	var stockarr = [];
	stockarr = await conn.query`
  SELECT * FROM stocks
`;
	setTimeout(async function () {
		var result2 = await conn.query`
		SELECT * FROM stockscomponents
	  `;
		result2.recordset.forEach(element1 => {
			arr.forEach(element2 => {
				if (element2.name == element1.prodname && element1.prodcount == 1) {
					stockarr.recordset.forEach(element3 => {
						if (element3.Id == element1.stockId) {
							element2.price = element2.price + "-" + (element2.price * (1 - element3.discount / 100)).toFixed(2);

						}
					})
				}
			})
		})
		response.render('index.ejs', { action: 'list1', registrert: isRegistrert, products: arr, pagenum: page, prodantall: prodcount });
	}, 200);
})

router.get("/drinks", async function (request, response, next) {
	chType = "Drinks"
	page = 1;
	var result = await conn.query`
	SELECT * FROM products WHERE type='Drinks'
  `;
	maxpage = result.recordset.length / 9;
	var arr = result.recordset.splice((page * 9) - 9, (page * 9));
	var stockarr = [];
	stockarr = await conn.query`
  SELECT * FROM stocks
`;
	setTimeout(async function () {
		var result2 = await conn.query`
		SELECT * FROM stockscomponents
	  `;
		result2.recordset.forEach(element1 => {
			arr.forEach(element2 => {
				if (element2.name == element1.prodname && element1.prodcount == 1) {
					stockarr.forEach(element3 => {
						if (element3.Id == element1.stockId) {
							element2.price = element2.price + "-" + (element2.price * (1 - element3.discount / 100)).toFixed(2);

						}
					})
				}
			})
		})
		response.render('index.ejs', { action: 'list2', registrert: isRegistrert, products: arr, pagenum: page, prodantall: prodcount });
	}, 200);
});

router.get("/sushi", async function (request, response, next) {
	chType = "Sushi"
	page = 1;
	var result = await conn.query`
	SELECT * FROM products WHERE type='Sushi'
  `;
	maxpage = result.recordset.length / 9;
	var arr = result.recordset.splice((page * 9) - 9, (page * 9));
	var stockarr = [];
	stockarr = await conn.query`
  SELECT * FROM stocks
`;
	setTimeout(async function () {
		var result2 = await conn.query`
		SELECT * FROM stockscomponents
	  `;
		result2.recordset.forEach(element1 => {
			arr.forEach(element2 => {
				if (element2.name == element1.prodname && element1.prodcount == 1) {
					stockarr.forEach(element3 => {
						if (element3.Id == element1.stockId) {
							element2.price = element2.price + "-" + (element2.price * (1 - element3.discount / 100)).toFixed(2);

						}
					})
				}
			})
		})
		response.render('index.ejs', { action: 'list3', registrert: isRegistrert, products: arr, pagenum: page, prodantall: prodcount });
	}, 200);
});
router.get("/burger", async function (request, response, next) {
	chType = "Burger"
	page = 1;
	var result = await conn.query`
	SELECT * FROM products WHERE type='Burger'
  `;
	maxpage = result.recordset.length / 9;
	var arr = result.recordset.splice((page * 9) - 9, (page * 9));
	var stockarr = [];
	stockarr = await conn.query`
  SELECT * FROM stocks
`;
	setTimeout(async function () {
		var result2 = await conn.query`
		SELECT * FROM stockscomponents
	  `;
		result2.recordset.forEach(element1 => {
			arr.forEach(element2 => {
				if (element2.name == element1.prodname && element1.prodcount == 1) {
					stockarr.forEach(element3 => {
						if (element3.Id == element1.stockId) {
							element2.price = element2.price + "-" + (element2.price * (1 - element3.discount / 100)).toFixed(2);

						}
					})
				}
			})
		})
		response.render('index.ejs', { action: 'list4', registrert: isRegistrert, products: arr, pagenum: page, prodantall: prodcount });
	}, 200);
});
router.get("/login", function (request, response, next) {
	response.render('auth.ejs', { action: 'login', login: '' });
});

router.get("/registrate", function (request, response, next) {
	response.render('auth.ejs', { action: 'registrate', login: '' });
});

router.post("/login", async function (request, response, next) {
	var login = request.body.login;
	var result = await conn.query`
	SELECT login, password FROM users
  `;
	result.recordset.forEach(async element => {
		if (login == element.login) {
			if (login == "Admin") {
				const hash = element.password;
				bcrypt.compare(request.body.password, hash).then((result) => {
					if (result == true) {
						isRegistrert = "Admin";
						prodcount = 0;
						finalprice = 0;
						prodarr = [];
						response.redirect('/');
					}
				});
			}
			else {
				const hash = element.password;
				bcrypt.compare(request.body.password, hash).then((result) => {
					if (result == true) {
						isRegistrert = "Yes";
						name2 = login;
						prodcount = 0;
						finalprice = 0;
						prodarr = [];
						response.redirect('/');
					}
				});
			}
		}
	});
});
router.post("/registrate", async function (request, response, next) {

	var login = request.body.login;

	var password = request.body.password;

	var email = request.body.email;

	var choose = request.body.adds;
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(password, salt, async function (err, hash) {
			var result = await conn.query(`
			INSERT INTO users 
			(login, password, email, adds) 
			VALUES ('${login}', '${hash}', '${email}', '${choose}')
			`, function (err, result2) {
				if (err) {
					let error = err.message;
					if (error.includes("dublicate key")) {
						response.render('auth.ejs', { action: 'registrate', login: 'false' });
					}
					else {
						throw err;
					}
				}
				else {
					prodcount = 0;
					isRegistrert = "Yes";
					name2 = login;
					module.exports.name = name2;
					prodcount = 0;
					finalprice = 0;
					prodarr = [];
					response.redirect('/');
				}
			})
		})

	});
});
router.post("/anotherpage", async function (request, response, next) {
	if (request.body.action == ">") {
		if (page < maxpage) {
			page += 1;
		}
	}
	else if (request.body.action == "<") {
		if (page > 1) {
			page -= 1;
		}
	}

	var result = await conn.query`
		SELECT * FROM products WHERE type=${chType}
	`

	var arr = result.recordset.splice((page * 9) - 9, (page * 9));
	var stockarr = [];
	var result2 = await conn.query`
			SELECT * FROM stocks
	`;
	stockarr = result2.recordset;
	setTimeout(async function () {
		var result3 = await conn.query`
				SELECT * FROM stockscomponents
		`;
		result3.recordset.forEach(element1 => {
			arr.forEach(element2 => {
				if (element2.name == element1.prodname && element1.prodcount == 1) {
					stockarr.forEach(element3 => {
						if (element3.Id == element1.stockId) {
							element2.price = element2.price + "-" + (element2.price * (1 - element3.discount / 100)).toFixed(2);
						}
					})
				}
			})
		})
		setTimeout(async function () {
			response.send({
				array: arr,
				pagenum: page,
			});
		}, 2000)
	}, 200)
});

router.post("/", function (request, response, next) {
	var action = request.body.action;
	var count = 0;
	for (var i = 0; i < prodarr.length; i++) {
		count++;
		if (prodarr[i].prodname == request.body.value) {
			finalprice += parseFloat(request.body.value2.slice(request.body.value2.indexOf('-') + 1));
			prodarr[i].prodcount++;
			count--;
		}
	}
	if (count == prodarr.length) {
		finalprice += parseFloat(request.body.value2.slice(request.body.value2.indexOf('-') + 1));
		prodarr.push({
			prodname: request.body.value,
			prodprice: request.body.value2.slice(request.body.value2.indexOf('-') + 1),
			prodimg: request.body.value3,
			prodcount: 1,
		});
	}
	if (action == 'fetch') {
		prodcount += 1;
		response.send({
			data: prodcount,
		});
	}
});
router.get("/bin", async function (request, response, next) {
	var stockarr = [];
	falsearr = JSON.parse(JSON.stringify(prodarr));

	var result = await conn.query`
	SELECT * FROM stocks
  `;
	stockarr = result.recordset;

	setTimeout(async function () {
		var result2 = await conn.query`
		SELECT * FROM stockscomponents
	  `;
		stockarr.forEach(element1 => {
			if (element1.type == 2) {
				let truecon = 0;
				let bufprodarr = [];
				result2.recordset.forEach(element2 => {
					if (element1.Id == element2.stockId) {
						bufprodarr.push(element2);
					}
				})
				for (let i = 0; i < bufprodarr.length; i++) {
					if (falsearr.some(obj => obj.prodname == bufprodarr[i].prodname)) {
						if (falsearr.find(obj => obj.prodname == bufprodarr[i].prodname).prodcount >= bufprodarr[i].prodcount) {
							truecon++;
						}
					}
				}
				if (truecon == bufprodarr.length) {
					for (let i = 0; i < bufprodarr.length; i++) {
						var produ = falsearr.find(obj => obj.prodname == bufprodarr[i].prodname);
						falsearr.find(obj => obj.prodname == bufprodarr[i].prodname).prodprice = (produ.prodprice * (1 - element1.discount / 100)).toFixed(2);
					}

				}
			}
		});
		finalprice = 0;
		for (let i = 0; i < falsearr.length; i++) {
			finalprice += falsearr[i].prodprice * falsearr[i].prodcount;
		}
		response.render('bin.ejs', { action: 'registrate', array: falsearr, finalprice: finalprice });
	}, 100)

});
router.post("/increase", async function (request, response, next) {
	if (request.body.action == '>') {
		for (var i = 0; i < prodarr.length; i++) {
			if (prodarr[i].prodname == request.body.value) {
				prodarr[i].prodcount++;
				prodcount++;

				var stockarr = [];
				falsearr = JSON.parse(JSON.stringify(prodarr));
				var result = await conn.query`
				SELECT * FROM stocks
			  `;
				stockarr = result.recordset;

				setTimeout(async function () {
					var result2 = await conn.query`
					SELECT * FROM stockscomponents
				  `;

					stockarr.forEach(element1 => {
						if (element1.type == 2) {
							let truecon = 0;
							let bufprodarr = [];
							result2.recordset.forEach(element2 => {
								if (element1.Id == element2.stockId) {
									bufprodarr.push(element2);
								}
							})
							for (let i = 0; i < bufprodarr.length; i++) {
								if (falsearr.some(obj => obj.prodname == bufprodarr[i].prodname)) {
									if (falsearr.find(obj => obj.prodname == bufprodarr[i].prodname).prodcount >= bufprodarr[i].prodcount) {
										truecon++;
									}
								}
							}
							if (truecon == bufprodarr.length) {
								for (let i = 0; i < bufprodarr.length; i++) {
									var produ = falsearr.find(obj => obj.prodname == bufprodarr[i].prodname);
									falsearr.find(obj => obj.prodname == bufprodarr[i].prodname).prodprice = (produ.prodprice * (1 - element1.discount / 100)).toFixed(2);
								}
							}
						}
					});
					finalprice = 0;
					for (let i = 0; i < falsearr.length; i++) {
						finalprice += falsearr[i].prodprice * falsearr[i].prodcount;
					}
					response.send({
						array: falsearr,
						data: prodcount,
						finalprice: finalprice.toFixed(2),
					});
				}, 100)
			}
		}
	}
	else if (request.body.action == '<') {
		for (var i = 0; i < prodarr.length; i++) {
			if (prodarr[i].prodname == request.body.value && prodarr[i].prodcount != 1) {
				prodarr[i].prodcount--;
				prodcount--;

				var stockarr = [];
				falsearr = JSON.parse(JSON.stringify(prodarr));
				var result = await conn.query`
				SELECT * FROM stocks
			  `;
				stockarr = result.recordset;

				setTimeout(async function () {
					var result2 = await conn.query`
					SELECT * FROM stockscomponents
				  `;
					stockarr.forEach(element1 => {
						if (element1.type == 2) {
							let truecon = 0;
							let bufprodarr = [];
							result2.recordset.forEach(element2 => {
								if (element1.Id == element2.stockId) {
									bufprodarr.push(element2);
								}
							})
							for (let i = 0; i < bufprodarr.length; i++) {
								if (falsearr.some(obj => obj.prodname == bufprodarr[i].prodname)) {
									if (falsearr.find(obj => obj.prodname == bufprodarr[i].prodname).prodcount >= bufprodarr[i].prodcount) {
										truecon++;
									}
								}
							}
							if (truecon == bufprodarr.length) {
								for (let i = 0; i < bufprodarr.length; i++) {
									var produ = falsearr.find(obj => obj.prodname == bufprodarr[i].prodname);
									falsearr.find(obj => obj.prodname == bufprodarr[i].prodname).prodprice = (produ.prodprice * (1 - element1.discount / 100)).toFixed(2);
								}
							}
						}
					});
					finalprice = 0;
					for (let i = 0; i < falsearr.length; i++) {
						finalprice += falsearr[i].prodprice * falsearr[i].prodcount;
					}
					response.send({
						array: falsearr,
						data: prodcount,
						finalprice: finalprice.toFixed(2),
					});
				}, 100)

				if (prodarr[i].prodcount == 0) {
					prodarr[i].prodcount++;
					prodcount++;
				}
			}
		}
	}

});
router.post("/delete", async function (request, response, next) {
	for (var i = 0; i < prodarr.length; i++) {
		if (prodarr[i].prodname == request.body.value) {
			finalprice -= parseFloat(prodarr[i].prodprice * prodarr[i].prodcount);
			prodcount -= prodarr[i].prodcount;
			prodarr.splice(i, 1);
		}
	}
	var stockarr = [];
	falsearr = JSON.parse(JSON.stringify(prodarr));
	var result = await conn.query`
	SELECT * FROM stocks
  `;
	stockarr = result.recordset;

	setTimeout(async function () {
		var result2 = await conn.query`
		SELECT * FROM stockscomponents
	`;
		stockarr.forEach(element1 => {
			if (element1.type == 2) {
				let truecon = 0;
				let bufprodarr = [];
				result2.recordset.forEach(element2 => {
					if (element1.Id == element2.stockId) {
						bufprodarr.push(element2);
					}
				})
				for (let i = 0; i < bufprodarr.length; i++) {
					if (falsearr.some(obj => obj.prodname == bufprodarr[i].prodname)) {
						if (falsearr.find(obj => obj.prodname == bufprodarr[i].prodname).prodcount >= bufprodarr[i].prodcount) {
							truecon++;
						}
					}
				}
				if (truecon == bufprodarr.length) {
					for (let i = 0; i < bufprodarr.length; i++) {
						var produ = falsearr.find(obj => obj.prodname == bufprodarr[i].prodname);
						falsearr.find(obj => obj.prodname == bufprodarr[i].prodname).prodprice = (produ.prodprice * (1 - element1.discount / 100)).toFixed(2);
					}
				}
			}
		});
		finalprice = 0;
		for (let i = 0; i < falsearr.length; i++) {
			finalprice += falsearr[i].prodprice * falsearr[i].prodcount;
		}
		response.send({
			array: falsearr,
			data: prodcount,
			finalprice: finalprice.toFixed(2),
		});
	}, 100)
});
router.get("/pay", function (request, response, next) {
	response.render('pay.ejs');
});
router.post("/pay", async function (request, response, next) {
	var result1 = await conn.query`
	SELECT * FROM daterecords
  `;
	var result3 = await conn.query`
  	INSERT INTO orders (dateId) VALUES (${result1.recordset[result1.recordset.length - 1].Id})
`;
	setTimeout(async function () {

		var result2 = await conn.query`
  	SELECT * FROM orders
`;
		setTimeout(async function () {
			prodarr.forEach(async element => {
				for (let i = 0; i < element.prodcount; i++) {
					var result3 = await conn.query`
			INSERT INTO ordercomponents (prodname, prodprice, orderId) VALUES (${element.prodname}, ${element.prodprice}, ${result2.recordset[result2.recordset.length - 1].Id})
		  `;
				}
			});
			response.redirect('/');
		}, 2000);
	}, 2000);
});
export default { router }

