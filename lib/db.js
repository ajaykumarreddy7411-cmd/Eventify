import mysql from "mysql2/promise";

const dbConfig = {
  host: "localhost",
  user: "root",
  password: process.env.SQL_PASSWORD,
  database: "eventify_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);

// Test connection once at startup and log clear message
async function testConnection(retries = 0) {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log("✅ MySQL connected to", dbConfig.database);
  } catch (err) {
    console.error("❌ MySQL connection error:", err.message || err);
    if (retries < 3) {
      const delay = 2000;
      console.log(
        `🔁 retrying connection in ${delay}ms (attempt ${retries + 1}/3)`
      );
      setTimeout(() => testConnection(retries + 1), delay);
    } else {
      console.error("⚠️ Unable to connect to MySQL after multiple attempts.");
      // optional: process.exit(1); // uncomment if you want the server to stop on DB failure
    }
  }
}

// call at module load (runs when server starts)
testConnection();

export default pool;
