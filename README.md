# query-loop-block-with-custom-fields
An extended version of the Query Loop block which queries by a custom field for event dates.

## Installation

`npm install`

## Build:
`wp-scripts build src/query-loop.js`

## Other considerations

This plugin is a demo, and it will only work if you have custom fields on the posts.

Custom field name: `event_date`
Custom field value format: `20250604`

<strong>Post types should be manually defined:</strong>

PHP: https://github.com/freibergergarcia/query-loop-block-with-custom-fields/blob/main/query-loop-block-extended.php#L30

JavaScript: https://github.com/freibergergarcia/query-loop-block-with-custom-fields/blob/main/src/query-loop.js#L34-L37

## Screenshots

A page with the extended query loop block in action, with the Post Type and Order By options:


A post with the `event_date` custom field set:
