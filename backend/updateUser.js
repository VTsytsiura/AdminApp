import { initDB } from "./db.js";

const updateUser = async (username, newusername, password, firstName, lastName, email, role) => {
  const db = await initDB();
  await db.run(
    `UPDATE users 
     SET username = ?, password = ?, first_name = ?, last_name = ?, email = ?, role = ? 
     WHERE username = ?`,
    [newusername, password, firstName, lastName, email, role, username]
  );
  console.log(`✅ User '${username}' updated!`);
  await db.close();
};

const [,, username, newusername, password, firstName, lastName, email, role] = process.argv;

if (!username || !newusername || !password) {
  console.log("Usage: node updateUser.js <username> <newusername> <password> <firstName> <lastName> <email> <role>");
  process.exit(1);
}

updateUser(username, newusername, password, firstName, lastName, email, role);