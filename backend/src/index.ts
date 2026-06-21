/**
 * My SonicJS Application
 *
 * Entry point for your SonicJS headless CMS application
 */

import { Hono } from 'hono'
import { createSonicJSApp, registerCollections } from '@sonicjs-cms/core'
import type { SonicJSConfig } from '@sonicjs-cms/core'

// Import custom collections
import boardMembersCollection from './collections/board-members.collection'
import boxersCollection from './collections/boxers.collection'
import eventsCollection from './collections/events.collection'
import fightsCollection from './collections/fights.collection'

// Import plugins (manual mounting until auto-loading is implemented)
import contactFormPlugin from './plugins/contact-form/index'

// Register all custom collections
registerCollections([
  boardMembersCollection,
  boxersCollection,
  eventsCollection,
  fightsCollection
])

// Application configuration
const config: SonicJSConfig = {
  collections: {
    autoSync: true
  },
  plugins: {
    directory: './src/plugins',
    autoLoad: false,  // Set to true to auto-load custom plugins
    disableAll: false,  // Enable plugins
    enabled: ['email', 'contact-form']  // Enable specific plugins
  }
}

// Create the core application
const coreApp = createSonicJSApp(config)

// Create main app and mount plugin routes manually
// (Plugin auto-mounting not yet implemented in core)
const app = new Hono()

// Mount plugin routes
if (contactFormPlugin.routes) {
  for (const route of contactFormPlugin.routes) {
    app.route(route.path, route.handler)
  }
}

// Unsecured endpoint for Astro frontend to create boxers
app.post('/api/unsecured/content/boxer', async (c) => {
  try {
    const db = c.env.DB;
    const payload = await c.req.json();
    const id = crypto.randomUUID();
    const now = Date.now();
    const slug = (payload.title || 'boxer').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 10000);
    
    // Fetch valid relationships
    const colRow = await db.prepare("SELECT id FROM collections WHERE name = 'boxer'").first();
    const collectionId = colRow ? colRow.id : 'col-boxer-017afa39';
    
    const userRow = await db.prepare("SELECT id FROM users LIMIT 1").first();
    const authorId = userRow ? userRow.id : '5515d24b-9387-4bd6-8451-d028541a60ac';

    await db.prepare(`
      INSERT INTO content (id, collection_id, slug, title, data, status, author_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      collectionId,
      slug,
      payload.title || 'Unknown',
      JSON.stringify(payload),
      'published',
      authorId,
      now,
      now
    ).run();
    
    return c.json({ success: true, id });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

app.post('/api/unsecured/content/fight', async (c) => {
  try {
    const db = c.env.DB;
    const payload = await c.req.json();
    const id = crypto.randomUUID();
    const now = Date.now();
    const slug = (payload.title || 'fight').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 10000);
    
    const colRow = await db.prepare("SELECT id FROM collections WHERE name = 'fight'").first();
    const collectionId = colRow ? colRow.id : 'fight';
    
    const userRow = await db.prepare("SELECT id FROM users LIMIT 1").first();
    const authorId = userRow ? userRow.id : 'system';

    await db.prepare(`
      INSERT INTO content (id, collection_id, slug, title, data, status, author_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id, collectionId, slug, payload.title || 'Fight', JSON.stringify(payload), 'published', authorId, now, now
    ).run();
    
    return c.json({ success: true, id });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

app.post('/api/unsecured/content/official', async (c) => {
  try {
    const db = c.env.DB;
    const payload = await c.req.json();
    const id = crypto.randomUUID();
    const now = Date.now();
    const slug = (payload.title || 'official').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 10000);
    
    const colRow = await db.prepare("SELECT id FROM collections WHERE name = 'official'").first();
    const collectionId = colRow ? colRow.id : 'official';
    
    const userRow = await db.prepare("SELECT id FROM users LIMIT 1").first();
    const authorId = userRow ? userRow.id : 'system';

    await db.prepare(`
      INSERT INTO content (id, collection_id, slug, title, data, status, author_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id, collectionId, slug, payload.title || 'Official', JSON.stringify(payload), 'published', authorId, now, now
    ).run();
    
    return c.json({ success: true, id });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

app.put('/api/unsecured/content/boxer/:id', async (c) => {
  try {
    const db = c.env.DB;
    const id = c.req.param('id');
    const payload = await c.req.json();
    const now = Date.now();
    
    // Fetch valid relationships
    const colRow = await db.prepare("SELECT id FROM collections WHERE name = 'boxer'").first();
    const collectionId = colRow ? colRow.id : 'col-boxer-017afa39';

    // First verify it exists
    const existing = await db.prepare('SELECT data FROM content WHERE id = ? AND collection_id = ?').bind(id, collectionId).first();
    if (!existing) {
      return c.json({ success: false, error: 'Boxer not found' }, 404);
    }

    const mergedData = { ...JSON.parse(existing.data as string), ...payload };

    await db.prepare(`
      UPDATE content SET data = ?, updated_at = ? WHERE id = ? AND collection_id = ?
    `).bind(
      JSON.stringify(mergedData),
      now,
      id,
      collectionId
    ).run();
    
    return c.json({ success: true });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Mount core app last (catch-all)
app.route('/', coreApp)

export default app
