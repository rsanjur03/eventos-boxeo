import type { CollectionConfig } from '@sonicjs-cms/core';

export default {
  name: 'boxer',
  displayName: 'Boxers',
  slug: 'boxers',
  description: 'Manage boxers roster',
  icon: '🥊',

  schema: {
    type: 'object',
    properties: {
      title: { // Required by SonicJS golden rule (Used as Name)
        type: 'string',
        title: 'Full Name',
        required: true,
        maxLength: 200,
      },
      alias: {
        type: 'string',
        title: 'Alias',
      },
      nationality: {
        type: 'string',
        title: 'Nationality',
      },
      province: {
        type: 'string',
        title: 'Province',
      },
      height: {
        type: 'string',
        title: 'Height',
      },
      weight: {
        type: 'string',
        title: 'Weight',
      },
      stance: {
        type: 'string',
        title: 'Stance (Orthodox/Southpaw)',
      },
      dob: {
        type: 'datetime',
        title: 'Date of Birth',
      },
      birthPlace: {
        type: 'string',
        title: 'Birth Place',
      },
      residence: {
        type: 'string',
        title: 'Residence',
      },
      trainer: {
        type: 'string',
        title: 'Trainer',
      },
      manager: {
        type: 'string',
        title: 'Manager',
      },
      wins: {
        type: 'number',
        title: 'Wins',
      },
      losses: {
        type: 'number',
        title: 'Losses',
      },
      draws: {
        type: 'number',
        title: 'Draws',
      },
      kos: {
        type: 'number',
        title: 'KOs',
      },
      imageUrl: {
        type: 'media',
        title: 'Image',
      },
    },
    required: ['title'],
  },

  listFields: ['title', 'alias', 'nationality', 'weight'],
  searchFields: ['title', 'alias'],
  defaultSort: 'title',
  defaultSortOrder: 'asc',

  managed: true,
  isActive: true,
} satisfies CollectionConfig;
