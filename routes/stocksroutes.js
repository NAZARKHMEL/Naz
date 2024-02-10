import express from 'express';
import * as bodyParser from 'body-parser';
import * as bcrypt from 'bcrypt';
import conn from 'mssql';
import * as nodemailer from 'nodemailer';

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

var router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static("images"));

var type = 1;
var prodarr = [];
var proddel = 0;

router.get("/", function (request, response, next) {
    prodarr = [];
    type = 1;
    response.render('stocks.ejs', { typ: type });
});
router.post("/create", async function (request, response, next) {

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

router.post("/op", function (request, response, next) {
    prodarr = [];
    prodarr.push({
        prodname: "",
        prodcount: 0,
    });
    type++;
    response.render('stocks.ejs', { typ: type, prodarr: prodarr });
});
router.post("/ned", function (request, response, next) {
    type--;
    response.render('stocks.ejs', { typ: type, prodarr: prodarr });
});
router.post("/addnew", function (request, response, next) {
    prodarr.push({
        prodname: "",
        prodcount: 0,
    });
    response.render('stocks.ejs', { typ: type, prodarr: prodarr });
});
router.post("/delete", function (request, response, next) {
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
router.post("/update", function (request, response, next) {
    if (request.body.value2.includes("name")) {
        prodarr[request.body.value2[request.body.value2.length - 1]].prodname = request.body.value1;
    }
    else if (request.body.value2.includes("count")) {
        prodarr[request.body.value2[request.body.value2.length - 1]].prodcount = request.body.value1;
    }

    response.render('stocks.ejs', { typ: type, prodarr: prodarr });
});
router.post("/create2", async function (request, response, next) {
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