const express = require('express');
const app = express();

const mysql = require('mysql2');

app.use(express.static("sf"));

app.listen(900);

app.get('/getareaname', (req, resp) => {
    console.log("we got itt");
    const dbobject = {
        host: 'localhost',
        user: 'root',
        password: 'cdac',
        database: 'nodejs',
        port: 3306
    }
    const conn = mysql.createConnection(dbobject);

    let output = { status: false, detail: { AccountNo: 0, Balance: "" } }
    let pin = req.query.AccountNo;
    console.log(AccountNo);
    conn.query('select AccountNo, Balance from location where AccountNo = ?', [AccountNo],
        (error, rows) => {
            if (error) {
                console.log(error);
            }
            else {
                if (rows.length > 0) {
                    output.status = true;
                    output.detail = rows[0];
                }
                else {
                    console.log("account is empty");
                }
            }
            console.log(output);
            resp.send(output);
        });

});

   
