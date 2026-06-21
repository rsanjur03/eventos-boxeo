import type { CollectionConfig } from '@sonicjs-cms/core';

export default {
  name: 'ticket_booklet',
  displayName: 'Ticket Booklets',
  slug: 'ticket-booklets',
  description: 'Manage ticket booklets for promoters and courtesy',
  icon: '🎟️',

  schema: {
    type: 'object',
    properties: {
      title: { 
        type: 'string',
        title: 'Booklet ID / Serial Range (e.g. 001-050)',
        required: true,
        maxLength: 200,
      },
      assignedTo: {
        type: 'string',
        title: 'Assigned To (Promoter/Sponsor)',
        required: true,
      },
      type: {
        type: 'string',
        title: 'Type (Venta, Cortesia)',
        required: true,
      },
      ticketsCount: {
        type: 'number',
        title: 'Number of Tickets',
        required: true,
      },
      eventId: {
        type: 'string',
        title: 'Event ID',
        required: true,
      }
    },
    required: ['title', 'assignedTo', 'type', 'ticketsCount', 'eventId'],
  },

  listFields: ['title', 'assignedTo', 'type', 'ticketsCount'],
  searchFields: ['title', 'assignedTo'],
  defaultSort: 'title',
  defaultSortOrder: 'asc',

  managed: true,
  isActive: true,
} satisfies CollectionConfig;
