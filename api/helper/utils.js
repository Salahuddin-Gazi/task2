import path, { dirname } from "path";
import { fileURLToPath } from "url";
import sqlite3 from "sqlite3";

var __filename = fileURLToPath(import.meta.url);
var folder_dir = dirname(__filename);
var __dirname = dirname(folder_dir);

export function set_views_path() {
  return path.join(__dirname, "views");
}

export function database_operation() {
  // Connect to SQLite database
  var db_path = path.join(__dirname, "monthly_revenues_data.db");
  var db = new sqlite3.Database(db_path, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      //   Create a table if it doesn't exist
      db.run(`CREATE TABLE IF NOT EXISTS revenues (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                month TEXT,
                revenue TEXT
            )`);
    }
  });

  return db;
}

export var revenue_monthly_data = [
  { month: "january", value: "70" },
  { month: "february", value: "65" },
  { month: "march", value: "80" },
  { month: "april", value: "75" },
  { month: "may", value: "85" },
  { month: "june", value: "90" },
  { month: "july", value: "80" },
  { month: "august", value: "75" },
  { month: "september", value: "60" },
  { month: "october", value: "55" },
  { month: "november", value: "75" },
  { month: "december", value: "85" },
];
