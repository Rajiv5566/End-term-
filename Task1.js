const express = require("express");
const app = express();

app.use(express.json());

let students = [
    { id: 1, name: "junaid",  marks: 85 },
    { id: 2, name: "Rahul", marks: 92 },
    { id: 3, name: "Keshab", marks: 78 },
    { id: 4, name: "Kiran", marks: 88 },
    { id: 5, name: "Khan", marks: 65 },
    { id: 6, name: "Arjun", marks: 67 }
];

app.get("/students", (req, res) => {
    res.json(students);
});

app.post("/students", (req, res) => {
    const { name, marks } = req.body;

    if (!name || marks == null) {
        return res.status(400).json({ error: "Name and marks are required." });
    }

    const newStudent = {
        id: students.length + 1,
        name,
        marks
    };

    students.push(newStudent);
    res.status(201).json(newStudent);
});

app.get("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ error: "Student not found" });
    }

    res.json(student);
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
