const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/index");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ info: "initial route" });
});

app.get("/students", db.students.getStudents);
app.get("/student", db.students.getStudentByName);
app.post("/students", db.students.createStudent);
app.patch("/students", db.students.updateStudent);
app.patch("/studentOne", db.students.updateOneStudent);
app.delete("/student", db.students.deleteStudentByName);

app.get("/classes", db.classes.getAll);
app.post("/classes", db.classes.create);
app.get("/class", db.classes.getClass);
app.get("/classone", db.classes.getByName);
app.put("/classes", db.classes.updateOne);
app.delete("/classes", db.classes.delByName);

app.listen(8080, () => {
    console.log("port 8080 listening...");
});
