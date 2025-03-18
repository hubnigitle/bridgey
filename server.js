const express = require("express");  
const mysql = require("mysql2");  
const cors = require("cors");  

const app = express();  
app.use(cors());  
app.use(express.json());  

// Konfigurasi koneksi ke MySQL  
const db = mysql.createConnection({  
    host: "127.0.0.1",  
    user: "root",        // Ganti dengan username MySQL Anda jika berbeda  
    password: "",        // Ganti dengan password MySQL Anda jika ada  
    database: "bridgey"  // Nama database  
});  

// Koneksi ke database MySQL  
db.connect(err => {  
    if (err) {  
        console.error("Database connection failed: " + err.message);  
    } else {  
        console.log("Connected to MySQL Database");  
    }  
});  

// Endpoint untuk mendapatkan URL gambar dari sponsor  
app.get("/sponsor-images", (req, res) => {  
    db.query("SELECT image_url FROM sponsor_post", (err, results) => {  
        if (err) {  
            console.error("Database query error: " + err.message);  
            res.status(500).json({ error: "Database query error" });  
        } else {  
            res.json(results); // Mengirimkan hasil ke client  
        }  
    });  
});  

// Menjalankan server di port 3000  
const port = 3000;  
app.listen(port, () => {  
    console.log("Server running on http://localhost:3000");  
});