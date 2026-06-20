import type { CollectionConfig } from '@sonicjs-cms/core';

export default {
  name: 'board_member',
  displayName: 'Board Members',
  slug: 'board-members',
  description: 'Manage COMIBOX board members',
  icon: '👔',

  schema: {
    type: 'object',
    properties: {
      title: { // Required by SonicJS
        type: 'string',
        title: 'Full Name',
        required: true,
        maxLength: 200,
      },
      role: {
        type: 'string',
        title: 'Role (e.g. Presidente, Tesorero)',
        required: true,
      },
      bio: {
        type: 'string',
        title: 'Biography',
      },
      imageUrl: {
        type: 'string',
        title: 'Image URL',
      }
    },
    required: ['title', 'role'],
  },

  listFields: ['title', 'role'],
  searchFields: ['title', 'role'],
  defaultSort: 'title',
  defaultSortOrder: 'asc',

  managed: true,
  isActive: true,
} satisfies CollectionConfig;
