import type { CollectionConfig } from '@sonicjs-cms/core';

export default {
  name: 'event',
  displayName: 'Events',
  slug: 'events',
  description: 'Manage boxing events',
  icon: '🏟️',

  schema: {
    type: 'object',
    properties: {
      title: { // Required by SonicJS
        type: 'string',
        title: 'Event Name',
        required: true,
        maxLength: 200,
      },
      date: {
        type: 'datetime',
        title: 'Event Date & Time',
        required: true,
      },
      location: {
        type: 'string',
        title: 'Location / Venue',
        required: true,
      },
      status: {
        type: 'string',
        title: 'Status (Preventa, Activo, Agotado)',
        required: true,
      },
      comiboxOrganized: {
        type: 'boolean',
        title: 'Organizado por COMIBOX (Venta de Boletos)',
        default: true,
      },
    },
    required: ['title', 'date', 'location', 'status'],
  },

  listFields: ['title', 'date', 'location', 'status'],
  searchFields: ['title', 'location'],
  defaultSort: 'date',
  defaultSortOrder: 'desc',

  managed: true,
  isActive: true,
} satisfies CollectionConfig;
