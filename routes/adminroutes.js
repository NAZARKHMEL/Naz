import express from 'express';
import * as bodyParser from 'body-parser';
import * as bcrypt from 'bcrypt';
import conn from 'mssql';
import multer from 'multer';
import * as fs from 'fs';

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

var router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static("images"));

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
router.get("/products", function (request, response, next) {
    response.render('products.ejs', { action: 'list1', confirm: "" });
});
router.post("/products", upload.single('filetoupload'), async function (request, response, next) {
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
router.post("/confirm", async function (request, response, next) {
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
router.post("/confirmdel", async function (request, response, next) {
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
router.post("/confirmupd", upload.single('filetoupload'), async function (request, response, next) {

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
router.post("/cancelupd", async function (request, response, next) {
    response.render('products.ejs', { action: 'list1', confirm: "No" });
});
router.post("/time", async function (request, response, next) {
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
router.post("/chooseYear", async function (request, response, next) {
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

router.post("/chooseMonth", async function (request, response, next) {
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

router.post("/chooseDay", async function (request, response, next) {
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
router.post("/chooseOrder", async function (request, response, next) {
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