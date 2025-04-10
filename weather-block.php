<?php
/**
 * Plugin Name: Weather Block
 * Description: A Gutenberg block to display today's weather information.
 * Version: 1.0
 * Author: Joe Rong
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Register admin menu
add_action('admin_menu', function () {
    add_options_page(
        'Weather Block Settings',
        'Weather Block',
        'manage_options',
        'weather_block',
        'weather_block_render_options_page'
    );
});

// Render the options page
function weather_block_render_options_page(): void {
    ?>
    <div class="wrap">
        <h1>Weather Block Settings</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('weather_block');
            do_settings_sections('weather_block');
            submit_button();
            ?>
        </form>
    </div>
    <?php
}

// Register settings and fields
add_action('admin_init', function () {
    register_setting('weather_block', 'weather_block_api_key');

    add_settings_section(
        'weather_block_section',
        __('Configuration', 'weather-block'),
        null,
        'weather_block'
    );

    add_settings_field(
        'weather_block_api_key',
        __('OpenWeatherMap API Key', 'weather-block'),
        'weather_block_render_api_key_field',
        'weather_block',
        'weather_block_section'
    );
});

// Render the input field for API key
function weather_block_render_api_key_field(): void {
    $api_key = get_option('weather_block_api_key', '');
    ?>
    <input type="text" name="weather_block_api_key" value="<?php echo esc_attr($api_key); ?>" />
    <p class="description"><?php esc_html_e('Enter your OpenWeatherMap API key here.', 'weather-block'); ?></p>
    <?php
}

// Enqueue block editor JS + pass API key
add_action('enqueue_block_editor_assets', function () {
    wp_enqueue_script(
        'weather-block',
        plugins_url('dist/block.js', __FILE__),
        ['wp-blocks', 'wp-element', 'wp-editor', 'wp-components'],
        filemtime(plugin_dir_path(__FILE__) . 'dist/block.js'),
        true
    );

    wp_localize_script('weather-block', 'weatherBlockData', [
        'apiKey' => get_option('weather_block_api_key'),
    ]);
});

// Enqueue block styles for both editor and front-end
function weather_block_enqueue_styles(): void {
    $css_file = plugin_dir_path(__FILE__) . 'dist/block.css';

    if (file_exists($css_file)) {
        wp_enqueue_style(
            'weather-block-style',
            plugin_dir_url(__FILE__) . 'dist/block.css',
            [],
            filemtime($css_file)
        );
    }
}
add_action('wp_enqueue_scripts', 'weather_block_enqueue_styles');
add_action('enqueue_block_editor_assets', 'weather_block_enqueue_styles');