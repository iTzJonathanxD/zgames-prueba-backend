const container = require("./config/container");
const Database = container.resolve("Database");

(async () => {
  try {
    await Database.connect();
  } catch (err) {
    console.error("Error during startup:", err.message);
  }
})();
