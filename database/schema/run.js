const fs = require("node:fs/promises");
const path = require("node:path");
const pool = require("../base/pool");

async function applySchema() {
  const files = (await fs.readdir(__dirname))
    .filter((file) => /^\d+_.*\.sql$/.test(file))
    .sort();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    for (const file of files) {
      const sql = await fs.readFile(path.join(__dirname, file), "utf8");
      await client.query(sql);
      console.log(`Applied ${file}`);
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

if (require.main === module) {
  applySchema().catch((error) => {
    console.error("Schema setup failed:", error);
    process.exitCode = 1;
  });
}

module.exports = applySchema;