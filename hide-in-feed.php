<?php
/**
 * Plugin Name: Hide in Feed
 * Plugin URI: https://github.com/zodiac1978/hide-in-feed/
 * Description: Adds a "Hide in Feed" option to all blocks, allowing you to exclude specific blocks from RSS feeds.
 * Version: 1.0.0
 * Requires at least: 5.0
 * Author: Torsten Landsiedel
 * Author URI: https://torstenlandsiedel.de/
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: hide-in-feed
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

class Hide_In_Feed {
    /**
     * Constructor
     */
    public function __construct() {
        // Add block controls
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_editor_assets'));
        
        // Filter blocks before they're rendered
        add_filter('pre_render_block', array($this, 'maybe_hide_block_in_feed'), 10, 3);
    }

    /**
     * Enqueue editor assets
     */
    public function enqueue_editor_assets() {
        wp_enqueue_script(
            'hide-in-feed-editor',
            plugins_url('js/editor.js', __FILE__),
            array('wp-blocks', 'wp-dom-ready', 'wp-edit-post', 'wp-element', 'wp-i18n', 'wp-components'),
            filemtime(plugin_dir_path(__FILE__) . 'js/editor.js'),
            true
        );

        // Add translations
        wp_set_script_translations('hide-in-feed-editor', 'hide-in-feed');
    }

    /**
     * Conditionally hide blocks in RSS feeds based on the hideInFeed attribute
     *
     * @param string|null $pre_render   The pre-rendered content. Default null.
     * @param array       $block        The block being rendered.
     * @param WP_Block    $wp_block     The block instance.
     * @return string|null              Filtered pre-render content.
     */
    public function maybe_hide_block_in_feed($pre_render, $block, $wp_block) {
        // Only filter content in feed context
        if (!is_feed()) {
            return $pre_render;
        }
        
        // Check if the block has the hideInFeed attribute set to true
        if (isset($block['attrs']['hideInFeed']) && $block['attrs']['hideInFeed'] === true) {
            // Return empty string to effectively hide this block
            return '';
        }
        
        // Return null to let WordPress render the block normally
        return $pre_render;
    }
}

// Initialize the plugin
new Hide_In_Feed();
