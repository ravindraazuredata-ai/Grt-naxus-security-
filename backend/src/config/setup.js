import sql from "mssql";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export async function ensureDatabaseExists() {
  const adminPool = await new sql.ConnectionPool({ ...dbConfig, database: "master" }).connect();
  const dbName = process.env.DB_NAME;
  const result = await adminPool.request().input("dbName", sql.NVarChar(255), dbName).query(
    "SELECT COUNT(*) AS count FROM sys.databases WHERE name = @dbName"
  );

  if (result.recordset[0].count === 0) {
    console.log(`Creating database ${dbName}`);
    await adminPool.request().input("dbName", sql.NVarChar(255), dbName).query(`CREATE DATABASE [${dbName}]`);
  }

  await adminPool.close();
}

export async function initializeSchema() {
  const schemaPath = path.resolve(__dirname, "../../../database/schema.sql");
  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Schema file not found at ${schemaPath}`);
  }

  const schema = fs.readFileSync(schemaPath, "utf-8");
  const databasePool = await new sql.ConnectionPool({ ...dbConfig, database: process.env.DB_NAME }).connect();
  const batches = schema
    .split(/\r?\nGO\r?\n/gi)
    .map((batch) => batch.trim())
    .filter(Boolean);

  for (const batch of batches) {
    await databasePool.request().query(batch);
  }

  await databasePool.close();
}
