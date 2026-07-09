const express = require("express");
const sql = require("mssql");

const app = express();
app.use(express.json());

// SQL Server Configuration
const config = {
    user: "nodeuser",
    password: "12345",
    server: "localhost\\SQLEXPRESS",
    database: "StudentDB",
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

let pool;

// Database Connection
async function connectDB() {
    try {
        pool = await sql.connect(config);
        console.log(" Database Connected Successfully");
    } catch (err) {
        console.error(" Database Connection Error:", err.message);
    }
}

// Home Route
app.get("/", (req, res) => {
    res.send("Backend API Running");
});

// GET All Students
app.get("/students", async (req, res) => {
    try {
        const result = await pool.request().query("SELECT * FROM Students");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST Add Student
app.post("/students", async (req, res) => {
    const { name, email, age } = req.body;

    try {
        await pool.request()
            .input("name", sql.NVarChar, name)
            .input("email", sql.NVarChar, email)
            .input("age", sql.Int, age)
            .query("INSERT INTO Students (Name, Email, Age) VALUES (@name, @email, @age)");

        res.json({
            message: "Student Added Successfully"
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT Update Student
app.put("/students/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;

    try {
        await pool.request()
            .input("id", sql.Int, id)
            .input("name", sql.NVarChar, name)
            .input("email", sql.NVarChar, email)
            .input("age", sql.Int, age)
            .query("UPDATE Students SET Name=@name, Email=@email, Age=@age WHERE Id=@id");

        res.json({
            message: "Student Updated Successfully"
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE Student
app.delete("/students/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await pool.request()
            .input("id", sql.Int, id)
            .query("DELETE FROM Students WHERE Id=@id");

        res.json({
            message: "Student Deleted Successfully"
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
connectDB().then(() => {
    app.listen(3000, () => {
        console.log(" Server Running On Port 3000");
    });
});