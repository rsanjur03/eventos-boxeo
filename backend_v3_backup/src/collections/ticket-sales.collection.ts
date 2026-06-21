import type { CollectionConfig } from '@sonicjs-cms/core';

export default {
  name: 'ticket_sale',
  displayName: 'Ticket Sales',
  slug: 'ticket-sales',
  description: 'Manage ticket purchases and attendees',
  icon: '🧾',

  schema: {
    type: 'object',
    properties: {
      title: { // Required by SonicJS
        type: 'string',
        title: 'Ticket Code / Buyer Name',
        required: true,
        maxLength: 200,
      },
      buyerEmail: {
        type: 'string',
        title: 'Buyer Email',
        required: true,
      },
      categoryId: {
        type: 'string',
        title: 'Ticket Category ID',
        required: true,
      },
      paymentStatus: {
        type: 'string',
        title: 'Payment Status (Pendiente, Pagado)',
        required: true,
      },
      amount: {
        type: 'string',
        title: 'Amount Paid',
      }
    },
    required: ['title', 'buyerEmail', 'categoryId', 'paymentStatus'],
  },

  listFields: ['title', 'buyerEmail', 'paymentStatus'],
  searchFields: ['title', 'buyerEmail'],
  defaultSort: 'createdAt',
  defaultSortOrder: 'desc',

  managed: true,
  isActive: true,
} satisfies CollectionConfig;
