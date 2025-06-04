const { registerBlockVariation } = wp.blocks;

registerBlockVariation('core/query', {
  name: 'event-date-query',
  title: 'Events by Date',
  description: 'Displays events ordered by event_date',
  icon: 'calendar',
  attributes: {
    namespace: 'event-date-query',
    query: {
      postType: 'post',
      order: 'asc',
      orderBy: 'id',
    },
  },
  allowedControls: ['order', 'orderBy', 'search'],
  isActive: ({ namespace }) => namespace === 'event-date-query',
  scope: ['inserter'],
});
