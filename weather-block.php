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

// Function to register the options page
function weather_block_add_admin_menu() {
  add_options_page(
      'Weather Block Settings', // Page title
      'Weather Block',          // Menu title
      'manage_options',         // Capability
      'weather_block',          // Menu slug
      'weather_block_options_page' // Callback function
  );
}
add_action('admin_menu', 'weather_block_add_admin_menu');

// Callback function to display the options page
function weather_block_options_page() {
  ?>
  <div class="wrap">
      <h1>Weather Block Settings</h1>
      <form method="post" action="options.php">
          <?php
          // Output security fields for the registered setting "weather_block"
          settings_fields('weather_block');
          // Output setting sections and their fields
          do_settings_sections('weather_block');
          // Output the save settings button
          submit_button();
          ?>
      </form>
  </div>
  <?php
}

// Register settings
function weather_block_settings_init() {
  register_setting('weather_block', 'weather_block_api_key');

  add_settings_section(
      'weather_block_section',
      __('Configuration', 'wordpress'), // Section title
      null,
      'weather_block' // Section slug
  );

  add_settings_field(
      'weather_block_api_key',
      __('OpenWeatherMap API Key', 'wordpress'), // Field title
      'weather_block_api_key_render', // Callback function
      'weather_block', // Page slug
      'weather_block_section' // Section slug
  );
}
add_action('admin_init', 'weather_block_settings_init');

// Render the API key input field
function weather_block_api_key_render() {
  $api_key = get_option('weather_block_api_key', ''); // Get saved API key
  ?>
  <input type="text" name="weather_block_api_key" value="<?php echo esc_attr($api_key); ?>" />
  <p class="description"><?php _e('Enter your OpenWeatherMap API key here.', 'wordpress'); ?></p>
  <?php
}

// Enqueue block assets
function weather_block_enqueue() {
    wp_enqueue_script(
        'weather-block',
        plugins_url('dist/block.js', __FILE__), // Enqueue the block JavaScript
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components'),
        true
    );
    // Pass the API key to the block JavaScript
    wp_localize_script('weather-block', 'weatherBlockData', array(
      'apiKey' => get_option('weather_block_api_key'), // Get API key from the database
  ));
}
add_action('enqueue_block_editor_assets', 'weather_block_enqueue');
function weather_block_enqueue_assets() {
  wp_enqueue_style(
      'weather-block-style',
      plugin_dir_url(__FILE__) . 'dist/block.css', // adjust path as needed
      [],
      filemtime(plugin_dir_path(__FILE__) . 'dist/block.css')
  );
}
add_action('wp_enqueue_scripts', 'weather_block_enqueue_assets');
add_action('enqueue_block_editor_assets', 'weather_block_enqueue_assets');
