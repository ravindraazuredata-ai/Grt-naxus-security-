import express from "express";
import bcrypt from "bcryptjs";
import { pool, sql } from "../config/database.js";
import { authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authorize, async (req, res) => {
  try {
    const db = await pool;
    const result = await db.request().query("SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC");
    res.json({ users: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load users" });
  }
});

router.post("/create", authorize, async (req, res) => {
  const { name, email, password, role = "student" } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: "Name, email, and password are required" });

  try {
    const db = await pool;
    const password_hash = await bcrypt.hash(password, 10);
    await db.request()
      .input("name", sql.NVarChar(150), name)
      .input("email", sql.NVarChar(255), email)
      .input("password_hash", sql.NVarChar(255), password_hash)
      .input("role", sql.NVarChar(50), role)
      .query("INSERT INTO users (name, email, password_hash, role) VALUES (@name, @email, @password_hash, @role)");
    res.json({ status: "user_created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

export default router;
