import { initDB } from "./db.js";

const listUsers = async () => {
  const db = await initDB();
  const users = await db.all("SELECT * FROM users");
  console.log("👥 Existing users:");
  users.forEach(user => {
    console.log(` - ${user.username} (ID: ${user.id}) | Role: ${user.role}`);
  });
  await db.close();
};

listUsers();