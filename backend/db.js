import sqlite3 from "sqlite3";
import { open } from "sqlite";

// створюємо і відкриваємо БД
export const initDB = async () => {
  const db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      first_name TEXT,
      last_name TEXT,
      email TEXT,
      role TEXT
    )
  `);

  return db;
};