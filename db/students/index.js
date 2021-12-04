const client = require("../db");

const getStudents = (request, response) => {
    client.query("SELECT * FROM students", (err, res) => {
        if (!err) {
            response.status(200).json(res.rows);
        } else {
            console.log(err);
        }
    });
};

const getStudentByName = (request, response) => {
    const { name } = request.body;
    client.query(
        "SELECT * FROM students WHERE name= $1",
        [name],
        (err, res) => {
            if (!err) {
                response.status(200).json(res.rows);
            } else {
                console.log(err);
            }
        }
    );
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

const updateOneStudent = (request, response) => {
    let keys = Object.keys(request.body);
    let values = Object.values(request.body);
    let str = "";

    for (let i = 0; i < keys.length; i++) {
        if (i == keys.length - 1) {
            str += `${keys[i]}=$${i + 1}`;
        } else {
            str += `${keys[i]}=$${i + 1}, `;
        }
    }

    client.query(
        `UPDATE students SET ${str} WHERE name=$1`,
        values,
        (err, res) => {
            if (!err) {
                response.status(201).send(`user updated`);
            } else {
                console.log(err);
            }
        }
    );
};

const deleteStudentByName = (request, response) => {
    const { name } = request.body;
    client.query("DELETE FROM students WHERE name= $1", [name], (err, res) => {
        if (!err) {
            response.status(200).send(`user deleted`);
        } else {
            console.log(err);
        }
    });
};

module.exports = {
    getStudents,
    createStudent,
    updateStudent,
    getStudentByName,
    deleteStudentByName,
    updateOneStudent,
};
