import type { CollectionConfig } from '@sonicjs-cms/core';

const officialCollection = {
  name: 'official',
  displayName: 'Officials',
  slug: 'officials',
  description: 'Manage Referees, Judges and Timekeepers',
  icon: '⚖️',

  schema: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        title: 'Full Name',
        required: true,
      },
      idNum: {
        type: 'string',
        title: 'Cédula',
      },
      phone: {
        type: 'string',
        title: 'Celular',
      },
      roles: {
        type: 'array',
        title: 'Roles',
        items: {
          type: 'string',
        },
      },
      dob: {
        type: 'datetime',
        title: 'Date of Birth',
      },
      sex: {
        type: 'string',
        title: 'Sexo',
      },
      bloodType: {
        type: 'string',
        title: 'Tipo de Sangre',
      },
      address: {
        type: 'string',
        title: 'Dirección',
      },
      startYear: {
        type: 'string',
        title: 'Año de Inicio',
      },
      hasLicense: {
        type: 'boolean',
        title: 'Tiene Carnet Vigente',
      },
      imageUrl: {
        type: 'media',
        title: 'Profile Photo',
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

export default officialCollection;
