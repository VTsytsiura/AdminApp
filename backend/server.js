import express from "express";
import cors from "cors";
import { initDB } from "./db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET = "supersecret";
const app = express();

app.use(cors());
app.use(express.json());

let db;

// Database init
(async () => {
  db = await initDB();
  console.log("✅ Database connected");
})();

// ------------------ CREATE USER (all fields) ------------------
app.post("/api/create/user", async (req, res) => {
  const { first_name, last_name, email, username, password, role } = req.body;

  if (!first_name || !last_name || !email || !username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const existing = await db.get(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email]
    );
    if (existing) return res.status(400).json({ error: "Username or email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.run(
      `INSERT INTO users (first_name, last_name, email, username, password, role)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, email, username, hashedPassword, role || "user"]
    );

    const newUser = await db.get("SELECT * FROM users WHERE id = ?", [result.lastID]);
    res.status(201).json({ success: true, user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------ REGISTER (simplified) ------------------
app.post("/api/register", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) return res.status(400).json({ error: "Missing required fields" });

  try {
    const existing = await db.get("SELECT * FROM users WHERE username = ?", [username]);
    if (existing) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.run(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
      [username, hashedPassword, role || "user"]
    );

    const newUser = await db.get("SELECT id, username, role FROM users WHERE id = ?", [result.lastID]);
    res.json({ success: true, user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------ LOGIN ------------------
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.get("SELECT * FROM users WHERE username = ?", [username]);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({ success: true, token, user: { ...user, password: undefined } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------ GET USER BY ID ------------------
app.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.get("SELECT * FROM users WHERE id = ?", [id]);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ success: true, user: { ...user, password: undefined } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------ GET ALL USERS ------------------
app.get("/api/users", async (req, res) => {
  try {
    const users = await db.all("SELECT * FROM users");
    // Hide passwords
    const cleanUsers = users.map(u => ({ ...u, password: undefined }));
    res.json({ success: true, users: cleanUsers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------ UPDATE USER ------------------
app.put("/api/update/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = await db.get("SELECT * FROM users WHERE id = ?", [id]);
    if (!currentUser) return res.status(404).json({ error: "User not found" });

    const updates = {};
    ["first_name", "last_name", "email", "username", "password", "role"].forEach(field => {
      if (field in req.body) updates[field] = req.body[field];
    });

    if (updates.password) {
      if (!req.body.currentPassword) {
        return res.status(400).json({ error: "Current password required" });
      }
      const isMatch = await bcrypt.compare(req.body.currentPassword, currentUser.password);
      if (!isMatch) return res.status(401).json({ error: "Current password is incorrect" });

      updates.password = await bcrypt.hash(updates.password, 10);
    }

    if (Object.keys(updates).length === 0) return res.status(400).json({ error: "No fields to update" });

    const setClause = Object.keys(updates).map(f => `${f} = ?`).join(", ");
    const values = Object.values(updates);

    await db.run(`UPDATE users SET ${setClause} WHERE id = ?`, [...values, id]);
    const updatedUser = await db.get("SELECT * FROM users WHERE id = ?", [id]);
    res.json({ success: true, user: { ...updatedUser, password: undefined } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------ DELETE USER ------------------
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.get("SELECT * FROM users WHERE id = ?", [id]);
    if (!user) return res.status(404).json({ error: "User not found" });

    await db.run("DELETE FROM users WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------ START SERVER ------------------
const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));