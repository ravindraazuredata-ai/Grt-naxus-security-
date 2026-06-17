import sql from "mssql";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const requiredVars = ["DB_USER", "DB_PASSWORD", "DB_SERVER", "DB_NAME"];
const missingVars = requiredVars.filter((key) => !process.env[key]);

if (missingVars.length > 0) {
  console.error(`Missing required DB environment variables: ${missingVars.join(", ")}`);
  throw new Error("Database configuration is incomplete. Please set values in backend/.env.");
}

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let pool;

export async function createPool() {
  if (pool) return pool;

  pool = await new sql.ConnectionPool(dbConfig)
    .connect()
    .then((client) => {
      console.log("MSSQL connected");
      return client;
    })
    .catch((error) => {
      console.error("MSSQL connection error:", error);
      process.exit(1);
    });

  return pool;
}

export { sql, pool };
