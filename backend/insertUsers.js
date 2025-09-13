import { initDB } from "./db.js";

const addUser = async (username, password) => {
  const db = await initDB();
  await db.run(
    "INSERT INTO users (username, password, first_name, last_name, email, role) VALUES (?, ?, ?, ?, ?, ?)",
    [username, password, 'firstName', 'lastName', 'email@example.com', 'user']
  );
  console.log(`✅ User '${username}' added!`);
  await db.close();
};

const [,, user, pass] = process.argv;

if (!user || !pass) {
  console.log("Usage: node addUser.js <username> <password>");
  process.exit(1);
}

addUser(user, pass);