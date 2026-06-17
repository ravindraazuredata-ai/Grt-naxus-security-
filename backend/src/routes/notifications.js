import express from "express";
import { pool, sql } from "../config/database.js";
import { authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authorize, async (req, res) => {
  try {
    const db = await pool;
    const result = await db.request().query(
      "SELECT id, type, title, message, is_read AS [read], created_at FROM notifications ORDER BY created_at DESC"
    );
    res.json({ notifications: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load notifications" });
  }
});

router.post("/mark-read", authorize, async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: "Notification ID required" });

  try {
    const db = await pool;
    await db.request().input("id", sql.Int, id).query("UPDATE notifications SET is_read = 1 WHERE id = @id");
    res.json({ status: "marked_read" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to mark notification" });
  }
});

export default router;
