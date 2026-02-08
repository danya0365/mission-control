
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '../lib/db';

const args = process.argv.slice(2);
const command = args[0];

async function main() {
  const db = getDb();

  if (command === 'create') {
    const username = args[1];
    const password = args[2];

    if (!username || !password) {
      console.error('Usage: npm run user:manage create <username> <password>');
      process.exit(1);
    }

    const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
    if (existing) {
      console.error(`User '${username}' already exists.`);
      process.exit(1);
    }

    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const now = new Date().toISOString();

    db.prepare(
      'INSERT INTO users (id, username, password, created_at) VALUES (?, ?, ?, ?)'
    ).run(id, username, hashedPassword, now);

    console.log(`✅ User '${username}' created successfully.`);

  } else if (command === 'reset-password') {
    const username = args[1];
    const password = args[2];

    if (!username || !password) {
      console.error('Usage: npm run user:manage reset-password <username> <new_password>');
      process.exit(1);
    }

    const user = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
    if (!user) {
      console.error(`User '${username}' not found.`);
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    db.prepare('UPDATE users SET password = ? WHERE username = ?').run(hashedPassword, username);

    console.log(`✅ Password for '${username}' updated successfully.`);

  } else if (command === 'list') {
    const users = db.prepare('SELECT id, username, created_at FROM users').all();
    console.table(users);
  } else {
    console.log(`
Usage:
  npm run user:manage create <username> <password>
  npm run user:manage reset-password <username> <new_password>
  npm run user:manage list
    `);
  }
}

main().catch(console.error);
