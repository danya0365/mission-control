
import { closeDb, getDb } from './index';
import { runMigrations } from './migrations';

console.log('🔄 Running database migrations...');

try {
  const db = getDb();
  runMigrations(db);
  console.log('✅ Migrations completed successfully');
} catch (error) {
  console.error('❌ Migration failed:', error);
  process.exit(1);
} finally {
  closeDb();
}
