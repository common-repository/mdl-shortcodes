<?php
/*
Plugin Name: Modern Design Library
Description: A modern design library toolkit for creating separators, lines, dividers, decorative elements and more.
Version: 1.1.3
Author: Ciprian Popescu
Author URI: https://getbutterfly.com
Plugin URI: https://getbutterfly.com/wordpress-plugins/modern-design-library-ui/
License: GNU General Public License v3 or later
License URI: https://www.gnu.org/licenses/gpl-3.0.html
Text Domain: mdl-shortcodes

MDL Shortcodes
Copyright (C) 2017-2023 Ciprian Popescu (getbutterfly@gmail.com)
Copyright (C) 2015-2017 TourKick (Clifford P) (https://tourkick.com/)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'MDLUI_VERSION', '1.1.3' );

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'mdlui_block_line_editor_assets' );

/**
 * Enqueue the block's assets for the editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function mdlui_block_line_editor_assets() {
    wp_enqueue_script(
        'mdlui-block-line',
        plugins_url( 'assets/block-line.js', __FILE__ ), // Block.js: We register the block here.
        [ 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-block-editor', 'wp-components' ], // Dependencies.
        MDLUI_VERSION
    );

    wp_enqueue_style(
        'mdlui-block-line-editor',
        plugins_url( 'assets/editor.css', __FILE__ ), // Block editor CSS.
        [ 'wp-edit-blocks' ], // Dependency to include the CSS after it.
        MDLUI_VERSION
    );
}



// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'mdlui_block_line_assets' );

/**
 * Enqueue the block's assets for the frontend.
 *
 * @since 1.0.0
 */
function mdlui_block_line_assets() {
    wp_enqueue_style(
        'mdlui-block-line-frontend', // Handle.
        plugins_url( 'assets/style.css', __FILE__ ), // Block frontend CSS.
        [], // Dependency to include the CSS after it.
        MDLUI_VERSION
    );
}






function mdlui_menu_links() {
    add_options_page( 'Modern Design Library', 'Modern Design Library', 'manage_options', 'mdlui', 'mdlui_build_admin_page' );
}

add_action( 'admin_menu', 'mdlui_menu_links', 10 );

function mdlui_build_admin_page() {
    $tab     = ( filter_has_var( INPUT_GET, 'tab' ) ) ? filter_input( INPUT_GET, 'tab' ) : 'dashboard';
    $section = 'admin.php?page=mdlui&amp;tab=';
    ?>
    <div class="wrap">
        <h1>Modern Design Library</h1>

        <h2 class="nav-tab-wrapper">
            <a href="<?php echo $section; ?>dashboard" class="nav-tab <?php echo $tab === 'dashboard' ? 'nav-tab-active' : ''; ?>">Dashboard</a>
            <a href="<?php echo $section; ?>installation" class="nav-tab <?php echo $tab === 'installation' ? 'nav-tab-active' : ''; ?>">Installation</a>
        </h2>

        <?php if ( $tab === 'dashboard' ) { ?>
            <h3>Modules</h3>
            <ul>
                <li>Coloured Dividers</li>
            </ul>
        <?php } ?>
    </div>
    <?php
}



function mdlui_admin_enqueue_scripts() {
    wp_enqueue_style( 'mdlui-admin-ui', plugins_url( 'assets/css/ui-admin.css', __FILE__ ) );
}

add_action( 'admin_enqueue_scripts', 'mdlui_admin_enqueue_scripts' );



/**
 * Enqueue Custom Cover Block Scripts
 *
 * @source https://github.com/Automattic/themes/tree/trunk/dalston/block-extends
 *
 * @todo Add more: https://github.com/search?q=repo%3AAutomattic%2Fthemes%20block-extends&type=code
 * @todo Add more: https://github.com/Automattic/themes/tree/trunk/dalston
 * @todo Add MS: https://developer.wordpress.org/reference/hooks/wp_initialize_site/
 */
function mdlui_block_extends() {
    // Seoara Block Tweaks
    wp_enqueue_script(
        'mdlui-extend-colored-line-block',
        plugins_url( '/block-extends/extend-colored-line-block.js', __FILE__ ),
        [ 'wp-blocks' ]
    );
}

add_action( 'enqueue_block_editor_assets', 'mdlui_block_extends' );

/**
 * Enqueue Custom Cover Block Styles
 */
function mdlui_block_extends_styles() {
    wp_enqueue_style(
        'mdlui-extend-colored-line-block-style',
        plugins_url( '/block-extends/extend-colored-line-block.css', __FILE__ )
    );
}

add_action( 'enqueue_block_assets', 'mdlui_block_extends_styles' );
