import express from 'express';
import * as bodyParser from 'body-parser';
import * as bcrypt from 'bcrypt';
import conn from 'mssql';
import * as fs from 'fs';
import multer from 'multer';
import nodemailer from 'nodemailer'

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

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nazkhmel@gmail.com',
        pass: 'jwdl krqh agcs filp'
    }
});
var con = conn.connect(config)
//Main
var isRegistrert = "No";
var page = 1;
var maxpage = 0;
var prodcount = 0;
var prodarr = [];
var falsearr = [];
var finalprice = 0;
var chType = "";
let name2 = "foobar";

//Admin
var address = "";
var name = "";
var type = "";
var price = "";
var dateyeararr = [];
var datemontharr = [];
var datedayarr = [];
var dateordersarr = [];
var dateinfoarr = [];
var chYear = 0;
var chMonth = 0;
var chDay = 0;
var chOrder = 0;
var boxheight = 0;
var formBox = "";
var maxpage = 0;
var page = 0;
var fourthInfoArr = [];

const months = [
    "Invalid",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

//Profile
var user = "";

//Stocks
var type = 1;
var prodarr = [];
var proddel = 0;

var router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static("images"));


const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, './prodimages/');
    },
    filename: function (req, file, cb) {
        let date = Date.now() + file.originalname;
        cb(null, date);
        address = date;
    }
});

const upload = multer({ storage: storage });

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
					stockarr.recordset.forEach(element3 => {
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
					stockarr.recordset.forEach(element3 => {
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
					stockarr.recordset.forEach(element3 => {
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
					name = name2;
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
router.get("/profile", async function (request, response, next) {
    var result = await conn.query`
        SELECT * FROM users WHERE login=${name2}
    `
    user = result.recordset;
    response.render('profile.ejs', { login: user[0].login, email: user[0].email, messages: user[0].adds });
});
router.post("/profile/update", async function (request, response, next) {
    const passwordValue1 = request.body.newpassword;
    const passwordValue2 = request.body.curpassword;

    if (passwordValue1.length > 0 && passwordValue2.length > 0) {
        bcrypt.compare(request.body.curpassword, user[0].password, (err, res) => {
            if (res == true) {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(request.body.newpassword, salt, async function (err, hash) {
                        var result = await conn.query`
                        UPDATE users SET password = ${hash} WHERE login = ${user[0].login};
                    `
                    });
                });
            }
        });
    }
    var result = await conn.query`
    UPDATE users SET login = ${request.body.login}, email = ${request.body.email}, adds = ${request.body.adds} WHERE login = ${user[0].login};
`
    var result2 = await conn.query`
    SELECT * FROM users WHERE login=${request.body.login};
`
    setTimeout(function(){
        user = result2.recordset[0];
        name2 = user.login;
        response.redirect('/profile')
    })
});
router.get("/admin", async function (request, response, next) {
    var yeararr = [];
    dateyeararr = [];
    datemontharr = [];
    datedayarr = [];
    dateordersarr = [];
    dateinfoarr = [];
    boxheight = 0;


    var resultprod = await conn.query`
        SELECT * FROM daterecords
    `
    resultprod.recordset.forEach(element => {
        if (!yeararr.includes(element.year) && !datedayarr.includes(element.year)) {
            yeararr.push(element.year);
            dateyeararr.push(element.year)
        }
    });
    page = 1;
    var formBox = "formbox";
    response.render('admin.ejs', {
        registrert: "Yes", yeararr: yeararr, montharr: datemontharr,
        dayarr: datedayarr, orders: dateordersarr, infoarr: dateinfoarr, secInfoArr: "",
        boxh: boxheight, pagenum: page, formBox: formBox
    });

});
router.get("/admin/products", function (request, response, next) {
    response.render('products.ejs', { action: 'list1', confirm: "" });
});
router.post("/admin/products", upload.single('filetoupload'), async function (request, response, next) {
    if (request.body.addbtn == "Add") {
        name = request.body.name;
        type = request.body.type;
        price = request.body.price;

        var addr = address;

        response.render('products.ejs', { action: 'list1', confirm: "Add", imgsrc: addr, name: name, type: type, price: price });
    }
    else if (request.body.delbtn == "Delete") {
        name = request.body.name;
        var result = await conn.query`
        SELECT type, price, img FROM products WHERE name=${name}
    `
        if (result.recordset.length) {
            type = result.recordset[0].type;
            price = result.recordset[0].price;
            address = result.recordset[0].img;
            response.render('products.ejs', { action: 'list1', confirm: "Delete", imgsrc: address, name: name, type: type, price: price });
        }
        else {
            response.render('products.ejs', { action: 'list1', confirm: "No" });
        }
    }
    else if (request.body.updbtn == "Update") {
        name = request.body.name;
        var result = await conn.query`
        SELECT id, type, price, img FROM products WHERE name=${name}
    `
        if (result.recordset.length) {
            var id = result.recordset[0].id;
            type = result.recordset[0].type;
            price = result.recordset[0].price;
            var addr = result.recordset[0].img;
            address = "";
            response.render('products.ejs', { action: 'list1', confirm: "Update", imgsrc: addr, name: name, type: type, price: price, userid: id });
        }
        else {
            response.render('products.ejs', { action: 'list1', confirm: "No" });
        }
    }
});
router.post("/admin/confirm", async function (request, response, next) {
    if (request.body.btnConfirm) {
        var result = await conn.query`
        INSERT INTO products 
        (name, type, price, img) 
        VALUES (${name}, ${type}, ${price}, ${address})
`
        response.render('products.ejs', { action: 'list1', confirm: "" });
    }
    else if (request.body['btnCancel']) {
        fs.unlink('./prodimages/' + address, (err) => {
            if (err) {
                throw err;
            }
        });
        response.render('products.ejs', { action: 'list1', confirm: "No" });
    }
});

router.post("/admin/confirmdel", async function (request, response, next) {
    if (request.body.btnConfirm) {
        fs.unlink('./prodimages/' + address, (err) => {
            if (err) {
                throw err;
            }
        });
        var result = await conn.query`
        DELETE FROM products 
        WHERE name=${name}
`
        response.render('products.ejs', { action: 'list1', confirm: "" });
    }
    else if (request.body.btnCancel) {
        response.render('products.ejs', { action: 'list1', confirm: "No" });
    }
});
router.post("/admin/confirmupd", upload.single('filetoupload'), async function (request, response, next) {

    var ad = "";
    if (address.length > 5) {
        ad = address;
        fs.unlink('./prodimages/' + request.body.imgsrc2, (err) => {
            if (err) {
                throw err;
            }
        });
    }
    else {
        ad = request.body.imgsrc2;
    }

    var result = await conn.query`
    UPDATE products SET name=${request.body.name}, type=${request.body.type},
     price=${request.body.price}, img=${ad} WHERE id=${request.body.userid};
`
    response.render('products.ejs', { action: 'list1', confirm: "" });
});
router.post("/admin/cancelupd", async function (request, response, next) {
    response.render('products.ejs', { action: 'list1', confirm: "No" });
});
router.post("/admin/time", async function (request, response, next) {
    let numberAddedOrders = 0;
    var numberOfDaysToAdd = parseInt(request.body.countOfDays);

    var resultdate = await conn.query`
    SELECT * FROM daterecords
    `
    var result = resultdate.recordset;
    var someDate = new Date(result[result.length - 1].month + "-" + result[result.length - 1].day + "-" + result[result.length - 1].year);

    for (let i = 0; i < numberOfDaysToAdd; i++) {
        someDate.setDate(someDate.getDate() - (i - 1));
        var newdate = someDate.setDate(someDate.getDate() + i);
        var data = new Date(someDate.toString());
        var dd = String(data.getDate()).padStart(1);
        var mm = String(data.getMonth() + 1).padStart(1);
        var yyyy = data.getFullYear();

        var resultdaterecords = await conn.query`
            INSERT INTO daterecords (day, month, year) VALUES (${dd}, ${mm}, ${yyyy})
            `
        var dateresult = await conn.query`
            SELECT * FROM daterecords WHERE day=${dd} AND month=${mm} AND year=${yyyy}
            `

        let maxord = Math.floor(Math.random() * 11) + 1;

        for (let i = 0; i < maxord; i++) {
            var result = await conn.query`
                INSERT INTO orders (dateId) VALUES (${dateresult.recordset[0].Id})
                `
            numberAddedOrders++;
        }

    }

    var result = await conn.query`
    SELECT * FROM stocks
    `
    for (let i = 0; i < parseInt(request.body.countOfDays); i++) {
        result.recordset.forEach(element => {
            element.days -= 1;
        })
    }
    result.recordset.forEach(async element => {
        var result = await conn.query`
        UPDATE stocks SET days = ${element.days} WHERE Id = ${element.Id};
        `
        if (element.days < 1) {
            var result = await conn.query`
            DELETE FROM stockscomponents WHERE stockId = ${element.Id};
            `
            var result = await conn.query`
            DELETE FROM stocks WHERE Id = ${element.Id};
            `
        }
    })

    setTimeout(async function () {
        var result1 = await conn.query`
        SELECT name, price FROM products
        `
        var result2 = await conn.query`
        SELECT * FROM orders
        `
        var resultprod = result1.recordset;
        var orderresult = result2.recordset;

        var arr = orderresult.slice(orderresult.length - numberAddedOrders, orderresult.length + 1);
        for (let i = 0; i < numberAddedOrders; i++) {
            let maxprod = Math.floor(Math.random() * 2) + 3;
            for (let j = 0; j < maxprod; j++) {
                var randomvalue = Math.floor(Math.random() * resultprod.length);
                var result = await conn.query`
                INSERT INTO ordercomponents (prodname, prodprice, orderId) VALUES
                (${resultprod[randomvalue].name},
                 ${resultprod[randomvalue].price},
                  ${arr[i].Id})`
            }
        }
        response.redirect('/admin/')
    }, 500);
});
router.post("/admin/chooseYear", async function (request, response, next) {
    var montharr = [];
    datemontharr = [];
    datedayarr = [];
    dateordersarr = [];
    dateinfoarr = [];
    boxheight = 0;
    chYear = request.body.choosenYear;
    var sum = 0.0;

    var resultprod = await conn.query`
    SELECT * FROM daterecords WHERE year=${chYear}
`
    var mostpopular = [];
    resultprod.recordset.forEach(async element => {
        if (!montharr.includes(months[element.month]) && !datemontharr.includes(months[element.month])) {
            montharr.push(months[element.month]);
            datemontharr.push(months[element.month])
        }

        var resultorder = await conn.query`
        SELECT * FROM orders WHERE dateId=${element.Id}
        `
        resultorder.recordset.forEach(async element => {
            var resultcomponent = await conn.query`
            SELECT * FROM ordercomponents WHERE orderId=${element.Id}
            `
            resultcomponent.recordset.forEach(element => {
                sum += parseFloat(element.prodprice);
                mostpopular.push(element.prodname);
            });
        })

    });
    setTimeout(function () {
        boxheight = "box";
        dateinfoarr.push("Info for " + chYear + " year");
        dateinfoarr.push("Total money: " + sum.toFixed(2) + "$");
        dateinfoarr.push("Most popular product: " + mode(mostpopular));
        dateinfoarr.push("Least popular product: " + modeMin(mostpopular));
        page = 1;
        var formBox = "formbox";
        response.render('admin.ejs', {
            registrert: "Yes", yeararr: dateyeararr, montharr: montharr,
            dayarr: datedayarr, orders: dateordersarr, infoarr: dateinfoarr, secInfoArr: "",
            boxh: boxheight, pagenum: page, formBox: formBox
        });
    }, 4000)
});

router.post("/admin/chooseMonth", async function (request, response, next) {
    var dayarr = [];
    datedayarr = [];
    var sum = 0;
    dateordersarr = [];
    dateinfoarr = [];
    chMonth = months.indexOf(request.body.choosenMonth);
    var resultprod = await conn.query`
    SELECT * FROM daterecords WHERE year=${chYear} AND month=${chMonth}
`
    var mostpopular = [];
    resultprod.recordset.forEach(async element => {
        if (!dayarr.includes(element.day) && !datedayarr.includes(element.day)) {
            dayarr.push(element.day);
            datedayarr.push(element.day)
        }
        var resultorder = await conn.query`
        SELECT * FROM orders WHERE dateId=${element.Id}
    `
        resultorder.recordset.forEach(async element => {
            var resultcomponent = await conn.query`
            SELECT * FROM ordercomponents WHERE orderId=${element.Id}
        `

            resultcomponent.recordset.forEach(element => {
                sum += parseFloat(element.prodprice);
                mostpopular.push(element.prodname);
            });
        });
    });
    setTimeout(function () {
        boxheight = "box";
        dateinfoarr.push("Info for " + months[chMonth] + " of " + chYear);
        dateinfoarr.push("Total money: " + sum.toFixed(2) + "$");
        dateinfoarr.push("Most popular product: " + mode(mostpopular));
        dateinfoarr.push("Least popular product: " + modeMin(mostpopular));
        page = 1;
        formBox = "formbox";

        response.render('admin.ejs', {
            registrert: "Yes", yeararr: dateyeararr, montharr: datemontharr,
            dayarr: dayarr, orders: dateordersarr, infoarr: dateinfoarr, secInfoArr: "",
            boxh: boxheight, pagenum: page, formBox: formBox
        });
    }, 2000)
})

router.post("/admin/chooseDay", async function (request, response, next) {
    var ordersarr = [];
    dateordersarr = [];
    dateinfoarr = [];
    var sum = 0;
    chDay = request.body.choosenDay;
    var resultprod = await conn.query`
    SELECT * FROM daterecords WHERE year=${chYear} AND month=${chMonth} AND day=${chDay}
`
    let id = resultprod.recordset[0].Id;
    var mostpopular = [];
    var resultprod2 = await conn.query`
        SELECT * FROM orders WHERE dateId=${id}
    `
    let i = 0;
    resultprod2.recordset.forEach(async element => {
        i++;
        ordersarr.push("Order #" + i);
        dateordersarr.push(element.Id);
        var resultcomponent = await conn.query`
        SELECT * FROM ordercomponents WHERE orderId=${element.Id}
    `
        resultcomponent.recordset.forEach(element => {
            sum += parseFloat(element.prodprice);
            mostpopular.push(element.prodname);
        });
    });
    setTimeout(function () {
        boxheight = "box";
        if (chDay == "1") {
            chDay += "-st ";
        }
        if (chDay == "2") {
            chDay += "-nd ";
        }
        if (chDay == "3") {
            chDay += "-rd ";
        }
        if (chDay > 3) {
            chDay += "-th ";
        }
        dateinfoarr.push("Info for " + chDay + months[chMonth] + " of " + chYear);
        dateinfoarr.push("Total money: " + sum.toFixed(2) + "$");
        dateinfoarr.push("Most popular product: " + mode(mostpopular));
        dateinfoarr.push("Least popular product: " + modeMin(mostpopular));
        page = 1;
        var formBox = "formbox";
        response.render('admin.ejs', {
            registrert: "Yes", yeararr: dateyeararr, montharr: datemontharr,
            dayarr: datedayarr, orders: ordersarr, infoarr: dateinfoarr, secInfoArr: "",
            boxh: boxheight, pagenum: page, formBox: formBox
        });
    }, 2000)
});
router.post("/admin/chooseOrder", async function (request, response, next) {
    chOrder = request.body.choosenOrder;
    var sum = 0;
    var prodOrderArr = [];
    var ordersarr = [];
    var fullProdArr = [];
    dateinfoarr = [];
    var secondInfoArr = [];
    fourthInfoArr = [];

    var resultprod = await conn.query`
    SELECT * FROM ordercomponents WHERE orderId=${dateordersarr[chOrder.slice(7) - 1]}
`
    resultprod.recordset.forEach(element => {
        sum += parseFloat(element.prodprice);
        prodOrderArr.push(element);
    });
    var i = 0;
    dateordersarr.forEach(element => {
        i++;
        ordersarr.push("Order #" + i)
    })
    setTimeout(function () {

        for (var i = 0; i < prodOrderArr.length; i++) {
            var c = 0;
            for (var j = 0; j < fullProdArr.length; j++) {
                if (fullProdArr[j].prodname == prodOrderArr[i].prodname) {
                    fullProdArr[j].prodcount++;
                    c++;
                }
            }
            if (c == 0) {
                fullProdArr.push({
                    prodname: prodOrderArr[i].prodname,
                    prodprice: prodOrderArr[i].prodprice,
                    prodimg: "1",
                    prodcount: 1,
                });
            }
        }
        if (chOrder == "1") {
            chOrder += "-st ";
        }
        if (chOrder == "2") {
            chOrder += "-nd ";
        }
        if (chOrder == "3") {
            chOrder += "-rd ";
        }
        if (chOrder > 3) {
            chOrder += "-th ";
        }
        dateinfoarr.push("Info for " + chOrder + " of " + chDay + months[chMonth] + " of " + chYear);
        dateinfoarr.push("");
        dateinfoarr.push("Total money: " + sum.toFixed(2) + "$");
        dateinfoarr.push("");

        fullProdArr.forEach(async element => {
            var resultprod = await conn.query`
            SELECT * FROM products WHERE name=${element.prodname}
        `
                element.prodimg = resultprod.recordset[0].img;
                secondInfoArr.push(element)
                fourthInfoArr.push(element);
        })
        setTimeout(function () {
            let sortedArr = secondInfoArr.slice().sort((a, b) => {
                return parseInt(a.prodprice) - parseInt(b.prodprice);
            });
            let slicedArr = sortedArr.slice((page * 3) - 3, page * 3);
            boxheight = "box";
            page = 1;
            var formBox = "";
            maxpage = fullProdArr.length / 3;
            response.render('admin.ejs', {
                registrert: "Yes", yeararr: dateyeararr, montharr: datemontharr,
                dayarr: datedayarr, orders: ordersarr, infoarr: dateinfoarr,
                secInfoArr: slicedArr, boxh: boxheight, pagenum: page, formBox: formBox
            });
        }, 2000)
    }, 2000)
});

router.post("/admin/anotherpage", async function (request, response, next) {
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
    var prodOrderArr = [];
    var ordersarr = [];
    var fullProdArr = [];
    dateinfoarr = [];
    var secondInfoArr = [];
    fourthInfoArr = [];

    var resultprod = await conn.query`
    SELECT * FROM ordercomponents WHERE orderId=${dateordersarr[chOrder.slice(7) - 1]}
`
    resultprod.recordset.forEach(element => {
        prodOrderArr.push(element);
    });

    setTimeout(function () {
        for (var i = 0; i < prodOrderArr.length; i++) {
            var c = 0;
            for (var j = 0; j < fullProdArr.length; j++) {
                if (fullProdArr[j].prodname == prodOrderArr[i].prodname) {
                    fullProdArr[j].prodcount++;
                    c++;
                }
            }
            if (c == 0) {
                fullProdArr.push({
                    prodname: prodOrderArr[i].prodname,
                    prodprice: prodOrderArr[i].prodprice,
                    prodimg: "1",
                    prodcount: 1,
                });
            }
        }

        fullProdArr.forEach(async element => {
            var resultprod = await conn.query`
            SELECT * FROM products WHERE name=${element.prodname}
        `
            element.prodimg = resultprod.recordset[0].img;
            secondInfoArr.push(element)
        })
        setTimeout(function () {
            let sortedArr = secondInfoArr.slice().sort((a, b) => {
                return parseInt(a.prodprice) - parseInt(b.prodprice);
            });
            let slicedArr = sortedArr.slice((page * 3) - 3, page * 3);
            response.send({
                array: slicedArr,
                pagenum: page,
            });
        }, 2000)
    }, 2000)

});
router.get("/stocks", function (request, response, next) {
    prodarr = [];
    type = 1;
    response.render('stocks.ejs', { typ: type });
});
router.post("/stocks/create", async function (request, response, next) {

    var result2 = await conn.query`
    SELECT * FROM users
    `
    result2.recordset.forEach(element => {
        if (element.adds == "Yes") {
            var mailOptions = {
                from: 'nazkhmel@gmail.com',
                to: element.email,
                subject: "NAZ",
                text: request.body.proddiscount + "% discount on " + request.body.prodname + ".\nOffer valid only for " + request.body.prodduration + " days!"
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {

                }
            });
        }
    });

    var result1 = await conn.query`
    INSERT INTO stocks (type, discount, days) VALUES (${type}, ${request.body.proddiscount}, ${request.body.prodduration})
    `
    result2 = await conn.query`
    SELECT * FROM stocks
    `
    var result3 = await conn.query`
    INSERT INTO stockscomponents (prodname, prodcount, stockId) VALUES (${request.body.prodname}, ${1}, ${result2.recordset[result2.recordset.length - 1].Id})
    `
    response.render('stocks.ejs', { typ: type, prodarr: prodarr });

});

router.post("/stocks/op", function (request, response, next) {
    prodarr = [];
    prodarr.push({
        prodname: "",
        prodcount: 0,
    });
    type++;
    response.render('stocks.ejs', { typ: type, prodarr: prodarr });
});
router.post("/stocks/ned", function (request, response, next) {
    type--;
    response.render('stocks.ejs', { typ: type, prodarr: prodarr });
});
router.post("/stocks/addnew", function (request, response, next) {
    prodarr.push({
        prodname: "",
        prodcount: 0,
    });
    response.render('stocks.ejs', { typ: type, prodarr: prodarr });
});
router.post("/stocks/delete", function (request, response, next) {
    if (request.body.value1 == null) {
        for (let i = 0; i < prodarr.length; i++) {
            prodarr[i].prodname = request.body["prodname" + i];
            prodarr[i].prodcount = request.body["prodcount" + i];
        }
        setTimeout(function () {
            prodarr.splice(proddel, 1)
            response.render('stocks.ejs', { typ: type, prodarr: prodarr });
        }, 100);
    }
    else {
        proddel = request.body.value1;
    }

});
router.post("/stocks/update", function (request, response, next) {
    if (request.body.value2.includes("name")) {
        prodarr[request.body.value2[request.body.value2.length - 1]].prodname = request.body.value1;
    }
    else if (request.body.value2.includes("count")) {
        prodarr[request.body.value2[request.body.value2.length - 1]].prodcount = request.body.value1;
    }

    response.render('stocks.ejs', { typ: type, prodarr: prodarr });
});
router.post("/stocks/create2", async function (request, response, next) {
    var result2 = await conn.query`
    SELECT * FROM users
    `
    var emailtext = "";
    prodarr.forEach(element => {
        emailtext += element.prodname + " in count of " + element.prodcount + ", "
    })
    emailtext += "in your cart ";
    result2.recordset.forEach(element => {
        if (element.adds == "Yes") {
            var mailOptions = {
                from: 'nazkhmel@gmail.com',
                to: element.email,
                subject: "NAZ",
                text: "Big sale!" + "\nIf you have " + emailtext + "you will get " + request.body.proddiscount + "% discount on them." +
                    "\nOffer valid only for " + request.body.prodduration + " days!"
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {

                }
            });
        }
    });
    var result1 = await conn.query`
    INSERT INTO stocks (type, discount, days) VALUES (${type}, ${request.body.proddiscount}, ${request.body.prodduration})
    `
    result2 = await conn.query`
    SELECT * FROM stocks
    `
    setTimeout(async function(){

        prodarr.forEach(async element => {
            var result3 = await conn.query`
            INSERT INTO stockscomponents (prodname, prodcount, stockId) VALUES (${element.prodname}, ${element.prodcount}, ${result2.recordset[result2.recordset.length - 1].Id})
            `
    
        })
        response.render('stocks.ejs', { typ: type, prodarr: prodarr });
    }, 2000)
});
export default { router }

function mode(array) {
    if (array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for (var i = 0; i < array.length; i++) {
        var el = array[i];
        if (modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;
        if (modeMap[el] > maxCount) {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}

function modeMin(array) {
    const result = [...array.reduce((r, n) =>
        r.set(n, (r.get(n) || 0) + 1), new Map()
    )]
        .reduce((r, v) => v[1] < r[1] ? v : r)[0];
    return result;
}
