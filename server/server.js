const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const fs = require("fs");
const mysql = require("mysql");
const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

connection.connect();

app.get("/api/customers", (req, res) => {
  connection.query("select * from customer", (err, rows, fields) => {
    res.send(rows);
  });
});

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
