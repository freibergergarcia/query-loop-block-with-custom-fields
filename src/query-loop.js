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

    if (name !== 'core/query' || attributes.namespace !== 'event-date-query') {
      return <BlockEdit {...props} />;
    }

    // Hardcoded post types for demo; you can fetch dynamically if needed
    const postTypeOptions = [
      { label: 'Posts', value: 'post' },
      { label: 'Pages', value: 'page' },
      { label: 'Event', value: 'event' },
      // Add more custom post types here if needed
    ];

    const postType = attributes.query?.postType ?? 'post';
    const setPostType = (value) => {
      setAttributes({
        query: {
          ...attributes.query,
          postType: value,
        },
      });
    };

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
          <wp.components.PanelBody title="Settings for Events by Date">
            <wp.components.SelectControl
              label="Post Type"
              value={postType}
              options={postTypeOptions}
              onChange={setPostType}
            />
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
