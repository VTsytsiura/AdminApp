import { initDB } from "./db.js";

const deleteUser = async (username) => {
  const db = await initDB();
  await db.run("DELETE FROM users WHERE username = ?", [username]);
  console.log(`❌ User '${username}' deleted!`);
  await db.close();
};
const [,, user] = process.argv;

if (!user) {
  console.log("Usage: node scriptToDB.js <username>");
  process.exit(1);
}
deleteUser(user);