import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

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
                { label: 'Date', value: 'date' },
                { label: 'Title', value: 'title' },
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
