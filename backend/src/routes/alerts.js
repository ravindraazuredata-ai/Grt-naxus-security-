import express from "express";
import { pool, sql } from "../config/database.js";
import { authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authorize, async (req, res) => {
  try {
    const db = await pool;
    const result = await db.request().query("SELECT * FROM alerts ORDER BY created_at DESC");
    res.json({ alerts: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load alerts" });
  }
});

router.post("/acknowledge", authorize, async (req, res) => {
  const { alertId } = req.body;
  if (!alertId) return res.status(400).json({ error: "Alert ID required" });

  try {
    const db = await pool;
    await db.request().input("id", sql.Int, alertId).query("UPDATE alerts SET acknowledged = 1 WHERE id = @id");
    res.json({ status: "acknowledged" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to acknowledge alert" });
  }
});

export default router;
