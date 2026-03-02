/**
 * db-sync.js
 * Triggers a fresh sync from Supabase into the local cache.
 * Called manually from Help → Check for Database Updates.
 */

async function syncDatabase(db) {
  try {
    await db._syncFromCloud();
    return { status: 'updated', message: 'Database synced successfully.' };
  } catch (err) {
    console.log('Sync failed:', err.message);
    return { status: 'offline', message: 'Could not reach server. Using local cache.' };
  }
}

module.exports = { syncDatabase };