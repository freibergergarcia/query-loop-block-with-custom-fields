import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
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
  allowedControls: [],
  isActive: ({ namespace }) => namespace === 'event-date-query',
  scope: ['inserter'],
});

addFilter(
  'editor.BlockEdit',
  'query-loop-extended/custom-orderby-dropdown',
  (BlockEdit) => (props) => {
    const { name, attributes, setAttributes } = props;

    // Only show for the custom variation
    if (name !== 'core/query' || attributes.namespace !== 'event-date-query') {
      return <BlockEdit {...props} />;
    }

    const orderBy = attributes.query?.orderBy ?? '';
    const setOrderBy = (value) => {
      setAttributes({
        query: {
          ...attributes.query,
          orderBy: value,
        },
      });
    };

    return (
      <>
        <BlockEdit {...props} />
        <wp.blockEditor.InspectorControls>
          <wp.components.PanelBody title="Custom Sorting">
            <wp.components.SelectControl
              label="Order By (Extended)"
              value={orderBy}
              options={[
                { label: 'Event Date ↑', value: 'event_date_asc' },
                { label: 'Event Date ↓', value: 'event_date_desc' },
              ]}
              onChange={setOrderBy}
            />
          </wp.components.PanelBody>
        </wp.blockEditor.InspectorControls>
      </>
    );
  }
);
