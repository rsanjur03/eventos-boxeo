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
    
    await db.prepare(`
      INSERT INTO content (id, collection_id, slug, title, data, status, author_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      'boxer',
      slug,
      payload.title || 'Unknown',
      JSON.stringify(payload),
      'published',
      'system',
      now,
      now
    ).run();
    
    return c.json({ success: true, id });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Mount core app last (catch-all)
app.route('/', coreApp)

export default app
