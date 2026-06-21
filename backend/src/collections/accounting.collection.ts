import type { CollectionConfig } from '@sonicjs-cms/core';

export default {
  name: 'accounting',
  displayName: 'Accounting',
  slug: 'accounting',
  description: 'Manage event expenses and revenues',
  icon: '💰',

  schema: {
    type: 'object',
    properties: {
      title: { 
        type: 'string',
        title: 'Description',
        required: true,
        maxLength: 200,
      },
      type: {
        type: 'string',
        title: 'Type (Ingreso, Gasto)',
        required: true,
      },
      amount: {
        type: 'number',
        title: 'Amount ($)',
        required: true,
      },
      category: {
        type: 'string',
        title: 'Category (Taquilla, Patrocinio, Bolsa, Operativo, Otros)',
        required: true,
      },
      eventId: {
        type: 'string',
        title: 'Event ID',
        required: true,
      }
    },
    required: ['title', 'type', 'amount', 'category', 'eventId'],
  },

  listFields: ['title', 'type', 'amount', 'category'],
  searchFields: ['title', 'category'],
  defaultSort: 'createdAt',
  defaultSortOrder: 'desc',

  managed: true,
  isActive: true,
} satisfies CollectionConfig;
