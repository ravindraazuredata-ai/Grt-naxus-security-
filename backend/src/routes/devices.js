import express from "express";
import { pool, sql } from "../config/database.js";
import { authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authorize, async (req, res) => {
  try {
    const db = await pool;
    const result = await db.request().query("SELECT * FROM devices ORDER BY last_seen DESC");
    res.json({ devices: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load devices" });
  }
});

router.post("/scan", authorize, async (req, res) => {
  const { subnet } = req.body;
  if (!subnet) return res.status(400).json({ error: "Subnet is required" });

  // Placeholder for future scan service implementation.
  res.json({ status: "scan started", subnet });
});

export default router;
