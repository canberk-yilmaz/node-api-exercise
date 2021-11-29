const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ info: "initial route" });
});

app.get('/students', db.getStudents)

app.post('/students', db.createStudent)

app.listen(8080, () => {
    console.log("port 8080 listening...");
});
