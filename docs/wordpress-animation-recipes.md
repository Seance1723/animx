# WordPress Animation Recipes (v3.28.0)

AnimX is not a WordPress plugin, but it integrates perfectly into WP themes and block editors.

## Enqueue Snippet (functions.php)

```php
function animx_enqueue_assets() {
  wp_enqueue_style('animx', get_stylesheet_directory_uri() . '/assets/animx/animx.min.css', array(), '3.28.0');
  wp_enqueue_script('animx', get_stylesheet_directory_uri() . '/assets/animx/animx.min.js', array(), '3.28.0', true);
}
add_action('wp_enqueue_scripts', 'animx_enqueue_assets');
```

Once enqueued, you can apply recipes via Gutenberg advanced classes or Elementor Custom Attributes:
`data-ax-recipe|wp-gutenberg-hero-reveal`
