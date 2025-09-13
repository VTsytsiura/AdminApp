import express from "express";
import cors from "cors";
import { initDB } from "./db.js";
import jwt from "jsonwebtoken";

const SECRET = "supersecret";

const app = express();
app.use(cors());
app.use(express.json());

let db;

// ініціалізація БД
(async () => {
  db = await initDB();
  console.log("✅ Database connected");
})();

// Register
app.post("/api/register", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const result = await db.run(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
      [username, password, role || "user"]
    );

    res.json({
      success: true,
      user: {
        id: result.lastID,
        username,
        role: role || "user"
      }
    });
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password]
  );

  if (user) {
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      SECRET,
      { expiresIn: "1h" }
    );
    res.json({ success: true, token, user });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Get User By Username
app.get("/api/users/:username", async (req, res) => {
  const { username } = req.params;

  const user = await db.get("SELECT * FROM users WHERE username = ?", [username]);

  console.log(user);

  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));