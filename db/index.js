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

const getStudents = (request, response) => {
    client.query("SELECT * FROM students", (err, res) => {
        if (!err) {
            response.status(200).json(res.rows);
        } else {
            console.log(err);
        }
    });
};

const createStudent = (request, response) => {
    const { name, surname, age, location, salary } = request.body;
    client.query(
        "INSERT INTO students VALUES ($1, $2, $3, $4, $5)",
        [name, surname, age, location, salary],
        (err, res) => {
            if (!err) {
                response.status(201).send(`user ${name} ${surname} created`);
            } else {
                console.log(err);
            }
        }
    );
};

const updateStudent = (request, response) => {
    const { name, surname, age, location, salary } = request.body;
    client.query(
        "UPDATE students SET name = $1, surname = $2, age = $3, location = $4, salary = $5 WHERE name = $1",
        [name, surname, age, location, salary],
        (err, res) => {
            if (!err) {
                response.status(200).send(`user ${name} ${surname} updated`);
            } else {
                console.log(err);
            }
        }
    );
};

module.exports = {
    getStudents,
    createStudent,
    updateStudent,
};
