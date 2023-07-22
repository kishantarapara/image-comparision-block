<?php

/**
 * Plugin Name: Image Comparison Block
**/


function image_comparison_block_register_block() {

    // Register JavaScript File
    wp_register_script(
        'custom-block1',
        plugins_url('build/index.js', __FILE__),
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-block-editor', 'wp-components' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )
    );
    
    // Register JavaScript File
    wp_register_script(
        'custom-block2',
        plugins_url('src/view.js', __FILE__),
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-block-editor', 'wp-components' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'src/view.js' )
    );

    // Register Editor Style
    wp_register_style(
        'custom-block-editor-style1',
        plugins_url('src/editor.css', __FILE__),
        array( 'wp-edit-blocks' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'src/editor.css' )
    );

    // Register Front End Block Style
    wp_register_style(
        'custom-block-frontend-style1',
        plugins_url('src/style.css', __FILE__),
        array( ),
        filemtime( plugin_dir_path( __FILE__ ) . 'src/style.css' )
    );

    // Register Block
    register_block_type('image-comparison-block/interactive-image-comparison-block', array(
        'editor_script' => 'custom-block1',
        'editor_style' =>  'custom-block-editor-style1',
        'style' => 'custom-block-frontend-style1',
        'script' => 'custom-block2',
    ));
}

add_action('init', 'image_comparison_block_register_block');