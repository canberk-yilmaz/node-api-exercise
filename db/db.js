const { Client } = require("pg");
const dotenv = require("dotenv");

const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log(__dirname);

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: process.env.PASSWORD,
    database: "postgres",
});

client.connect();

module.exports = client