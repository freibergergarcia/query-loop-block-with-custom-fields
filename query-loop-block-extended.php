<?php
/**
 * Plugin Name:       Query Loop Block Extended - Events by Date
 * Description:       An extended version of the Query Loop block which queries by a custom field for event dates.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Bruno and Sathiya
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dynamic-block
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

add_action( 'enqueue_block_editor_assets', function () {
    wp_enqueue_script(
        'event-date-query-block',
        plugins_url( 'build/query-loop.js', __FILE__ ),
        [ 'wp-blocks', 'wp-element', 'wp-editor' ],
        filemtime( plugin_dir_path( __FILE__ ) . 'build/query-loop.js' ),
        true
    );
} );

$allowed_post_types = [ 'post', 'page', 'event' ];

foreach ( $allowed_post_types as $post_type ) {
    add_filter( "rest_{$post_type}_collection_params", function( $params ) {
        if ( isset( $params['orderby'] ) && isset( $params['orderby']['enum'] ) ) {
            $params['orderby']['enum'][] = 'event_date_asc';
            $params['orderby']['enum'][] = 'event_date_desc';
        }
        return $params;
    } );

    add_filter( "rest_{$post_type}_query", function( $args, $request ) {
        if ( isset( $request['orderby'] ) && in_array( $request['orderby'], [ 'event_date_asc', 'event_date_desc' ], true ) ) {
            $args['meta_key']  = 'event_date';
            $args['orderby']   = 'meta_value';
            $args['meta_type'] = 'DATE';
            $args['order']     = $request['orderby'] === 'event_date_asc' ? 'ASC' : 'DESC';
        }
        return $args;
    }, 10, 2 );
}

add_filter(
    'pre_render_block',
    function ( $pre_render, $parsed_block ) {
        if (
            isset( $parsed_block['blockName'], $parsed_block['attrs']['namespace'] )
            && $parsed_block['blockName'] === 'core/query'
            && $parsed_block['attrs']['namespace'] === 'event-date-query'
        ) {
            $query = $parsed_block['attrs']['query'] ?? [];
            if (
                isset( $query['orderBy'] ) &&
                in_array( $query['orderBy'], [ 'event_date_asc', 'event_date_desc' ], true )
            ) {
                add_filter(
                    'query_loop_block_query_vars',
                    function ( $default_query, $block ) use ( $query ) {
                        if ( isset( $query['orderBy'] ) ) {
                            $default_query['meta_key']  = 'event_date';
                            $default_query['orderby']   = 'meta_value';
                            $default_query['meta_type'] = 'DATE';
                            $default_query['order']     = $query['orderBy'] === 'event_date_asc' ? 'ASC' : 'DESC';
                        }
                        return $default_query;
                    },
                    10,
                    2
                );
            }
        }
        return $pre_render;
    },
    10,
    2
);
