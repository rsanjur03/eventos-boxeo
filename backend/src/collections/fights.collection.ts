import type { CollectionConfig } from '@sonicjs-cms/core';

export default {
  name: 'fight',
  displayName: 'Fights',
  slug: 'fights',
  description: 'Manage fights and bouts',
  icon: '🤼',

  schema: {
    type: 'object',
    properties: {
      title: { // Required by SonicJS
        type: 'string',
        title: 'Fight Name (e.g., Boxer A vs Boxer B)',
        required: true,
        maxLength: 200,
      },
      eventId: {
        type: 'string',
        title: 'Event ID',
      },
      weightClass: {
        type: 'string',
        title: 'Weight Class',
      },
      boxerAId: {
        type: 'string',
        title: 'Boxer A ID',
      },
      boxerBId: {
        type: 'string',
        title: 'Boxer B ID',
      },
      rounds: {
        type: 'number',
        title: 'Number of Rounds',
      },
      result: {
        type: 'string',
        title: 'Result',
      }
    },
    required: ['title'],
  },

  listFields: ['title', 'weightClass', 'eventId'],
  searchFields: ['title'],
  defaultSort: 'createdAt',
  defaultSortOrder: 'desc',

  managed: true,
  isActive: true,
} satisfies CollectionConfig;
