import express from "express";
import { pool } from "../config/database.js";
import { authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authorize, async (req, res) => {
  try {
    const db = await pool;
    const result = await db.request().query("SELECT * FROM policies ORDER BY priority DESC");
    res.json({ policies: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load policies" });
  }
});

export default router;
