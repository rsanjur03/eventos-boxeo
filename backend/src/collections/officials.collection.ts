import type { CollectionConfig } from '@sonicjs-cms/core';

export default {
  name: 'official',
  displayName: 'Officials',
  slug: 'officials',
  description: 'Manage Referees, Judges and Timekeepers',
  icon: '⚖️',

  schema: {
    type: 'object',
    properties: {
      title: { // Required by SonicJS
        type: 'string',
        title: 'Full Name',
        required: true,
        maxLength: 200,
      },
      dob: {
        type: 'datetime',
        title: 'Date of Birth',
      },
      isReferee: {
        type: 'boolean',
        title: 'Is Referee (Árbitro)',
      },
      isJudge: {
        type: 'boolean',
        title: 'Is Judge (Juez)',
      },
      isTimekeeper: {
        type: 'boolean',
        title: 'Is Timekeeper (Juez de Tiempo)',
      },
      imageUrl: {
        type: 'media',
        title: 'Image',
      }
    },
    required: ['title'],
  },

  listFields: ['title', 'isReferee', 'isJudge', 'isTimekeeper'],
  searchFields: ['title'],
  defaultSort: 'title',
  defaultSortOrder: 'asc',

  managed: true,
  isActive: true,
} satisfies CollectionConfig;
