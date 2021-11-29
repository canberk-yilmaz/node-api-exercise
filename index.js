const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: process.env.PASSWORD,
    database: "postgres",
});

client.connect();

client.query("SELECT * FROM students", (err, res) => {
    if (!err) {
        console.log(res.rows);
    } else {
        console.log(err);
    }
});
