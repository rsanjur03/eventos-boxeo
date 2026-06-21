import type { CollectionConfig } from '@sonicjs-cms/core';

export default {
  name: 'ticket_category',
  displayName: 'Ticket Categories',
  slug: 'ticket-categories',
  description: 'Manage ticket zones and prices',
  icon: '🎟️',

  schema: {
    type: 'object',
    properties: {
      title: { // Required by SonicJS
        type: 'string',
        title: 'Category Name (e.g. VIP, Ringside)',
        required: true,
        maxLength: 200,
      },
      price: {
        type: 'string', // Storing as string to avoid floating point issues, or can use number
        title: 'Price',
        required: true,
      },
      capacity: {
        type: 'number',
        title: 'Maximum Capacity',
        required: true,
      },
      benefits: {
        type: 'string',
        title: 'Included Benefits',
      },
      eventId: {
        type: 'relation',
        title: 'Event',
        // SonicJS relation syntax typically defines target collection
        // Not perfectly specified in guide, but standard is text or relation.
      }
    },
    required: ['title', 'price', 'capacity'],
  },

  listFields: ['title', 'price', 'capacity'],
  searchFields: ['title'],
  defaultSort: 'title',
  defaultSortOrder: 'asc',

  managed: true,
  isActive: true,
} satisfies CollectionConfig;
