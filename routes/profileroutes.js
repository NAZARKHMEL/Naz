import express from 'express';
import * as bodyParser from 'body-parser';
import * as bcrypt from 'bcrypt';
import conn from 'mssql';
import { name2, modifyX } from './routes.js';

var router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static("images"));

var user = "";

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

router.get("/", async function (request, response, next) {
    var result = await conn.query`
        SELECT * FROM users WHERE login=${name2}
    `
    user = result.recordset;
    response.render('profile.ejs', { login: user[0].login, email: user[0].email, messages: user[0].adds });
});
router.post("/update", async function (request, response, next) {
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
        modifyX(user.login);
        response.redirect('/profile')
    })
});
export default { router }
