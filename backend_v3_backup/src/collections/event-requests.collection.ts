import type { CollectionConfig } from '@sonicjs-cms/core';

export default {
  name: 'event_request',
  displayName: 'Event Requests',
  slug: 'event-requests',
  description: 'Event requests from promoters',
  icon: '📝',

  schema: {
    type: 'object',
    properties: {
      title: { // Required by SonicJS
        type: 'string',
        title: 'Request Title (e.g. Event Name)',
        required: true,
        maxLength: 200,
      },
      promoterName: {
        type: 'string',
        title: 'Promoter Name',
        required: true,
      },
      promoterEmail: {
        type: 'string',
        title: 'Promoter Email',
        required: true,
      },
      venue: {
        type: 'string',
        title: 'Venue Name',
      },
      mapLocation: {
        type: 'string',
        title: 'Map Location (URL/Coordinates)',
      },
      proposedDate: {
        type: 'datetime',
        title: 'Proposed Date',
      },
      status: {
        type: 'string',
        title: 'Status (Pending, Quoted, Approved, Rejected)',
        default: 'Pending',
      },
      quotePdfUrl: {
        type: 'string',
        title: 'Quote PDF URL',
      }
    },
    required: ['title', 'promoterName', 'promoterEmail'],
  },

  listFields: ['title', 'promoterName', 'status'],
  searchFields: ['title', 'promoterName'],
  defaultSort: 'createdAt',
  defaultSortOrder: 'desc',

  managed: true,
  isActive: true,
} satisfies CollectionConfig;
