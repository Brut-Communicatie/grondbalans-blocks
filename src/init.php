<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function my_block_cgb_block_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'my_block-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		is_admin() ? array( 'wp-editor' ) : null, // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// Register block editor script for backend.
	wp_register_script(
		'my_block-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Register block editor styles for backend.
	wp_register_style(
		'my_block-cgb-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
	wp_localize_script(
		'my_block-cgb-block-js',
		'cgbGlobal', // Array containing dynamic data for a JS Global.
		[
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
			// Add more data here that you want to access from `cgbGlobal` object.
		]
	);

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type(
		'cgb/block-my-block', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'my_block-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'my_block-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'my_block-cgb-block-editor-css',
			'render_callback' => 'render_grondbank',
		)
	);

	register_block_type(
		'cgb/grondbalans-banner', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'my_block-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'my_block-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'my_block-cgb-block-editor-css',
			'render_callback' => 'render_banner',
		)
	);

	register_block_type(
		'cgb/grondbalans-content', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'my_block-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'my_block-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'my_block-cgb-block-editor-css',
			'render_callback' => 'render_content',
		)
	);
	register_block_type(
		'cgb/grondbalans-blockrechts', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'my_block-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'my_block-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'my_block-cgb-block-editor-css',
			'render_callback' => 'render_block_rechts',
		)
	);
	register_block_type(
		'cgb/grondbalans-blocklinks', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'my_block-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'my_block-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'my_block-cgb-block-editor-css',
			'render_callback' => 'render_block_links',
		)
	);
	register_block_type(
		'cgb/grondbalans-container', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'my_block-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'my_block-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'my_block-cgb-block-editor-css',
			'render_callback' => 'render_blocks_container',
		)
	);
	register_block_type(
		'cgb/grondbalans-blockvideo', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'my_block-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'my_block-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'my_block-cgb-block-editor-css',
			'render_callback' => 'render_blocks_video',
		)
	);



}


function render_grondbank( $attributes ){

	ob_start();
	$naam = $attributes['grondbankName'];
	$id = strtolower($naam);
	$adres = $attributes['grondbankAdres'];
	$straat = $attributes['grondbankStraat'];
	$contact = $attributes['grondbankContact'];
	$tel = $attributes['grondbankTel'];
	$mail = $attributes['grondbankMail'];

	echo '<div class="grondbank__item" id="gb-'. $id .'">';
	echo '<div class="grondbank__image">';
	echo '<img src="'. $attributes['mediaUrl'] .'" alt="Foto van plaats" />';
	echo '</div>';

	echo '<div class="grondbank__details">';

	echo '<div class="grondbank__details--top">';
	echo '<h3>Grondbank '. $naam .'</h3>'; // Title
	echo '<p>'. $straat .'</p>'; // Straat
	echo '<p>'. $adres.'</p>'; // Adres
	echo '</div>';

	echo '<div class="grondbank__details--mid">';
	echo '<p>Contactpersoon:</p>';
	echo '<p><strong>'. $contact .'</strong></p>'; //Contactpersoon
	echo '<p>'. $tel .'</p>'; //Telefoon
	echo '<a href="mailto:'. $mail .'">'.$mail.'</a>'; //email;
	echo '</div>';

	echo '<div class="grondbank__details--onder">';
	echo '<h4>Samenwerkingsverband met:</h4>'; 
	echo '<img src="'. $attributes['logoUrl'] .'" alt="Logo van partner" />';
	echo '</div>';

	echo '</div>';
	echo '</div>';
	return ob_get_clean();
}

function render_banner($attributes) {

	$fontSize = $attributes['fontSize'];
	$link = $attributes['link'];

	ob_start();
	
	echo '<div class="banner" style="background-image: url('. $attributes['mediaUrl'] .')">';
	echo '<div class="banner__container">';
	echo '<div class="banner__block">';
	echo '<div class="banner__block--content" >';

	echo '<h1 style="font-size: '. ($fontSize ? $fontSize : null).'">'. $attributes['heading'] . '</h1>';
	echo '<p>'. $attributes['content'] .'</p>';
	if ($link) {
		echo '<a href="'. $link .'">'. $attributes['button'].'</a>';
	}
	echo '</div>';
	echo '</div>';
	echo '</div>';
	echo '</div>';
	return ob_get_clean();
}

function render_content($attributes){
	ob_start();
	echo '<div class="content">';
    echo '<div class="content__container">';
	echo '<div class="content__intro">';
	echo '<h1>'. $attributes['heading'].'</h1>';
	echo '<h2>'. $atrr	['subheading'] .'</h2>';
	echo '<p>'. $attributes['content']. '</p>';
	echo '<div class="content__line"></div>';
	echo '</div>';
	echo '</div>';
	echo '</div>';
	return ob_get_clean();
}

function render_block_rechts($attributes){
	$img = $attributes['mediaUrl'];
	ob_start();
	echo '<div class="portfolio__block" id="" data-aos="fade-left" data-aos-delay="250">';
	echo '<div class="portfolio__block--container">';
	echo '<div class="portfolio__block--left">';
	echo '<div class="portfolio__block--left-content">';
	echo '<h3>';
	echo $attributes['heading'];
	echo '</h3>';
	echo '<h4>';
	echo $attributes['subheading'];
	echo '</h4>';
	echo $attributes['content'];
	if ($attributes['button']) {
		echo '<a href="/contact/#contact">';
		echo $attributes['button'];
		echo '</a>';
	}
	echo '</div>';
	echo '</div>';
	echo '<div class="portfolio__block--right '. ($attributes['class'] ? 'portfolio--noshadow' : null).'">';
	echo '<img src="'. $img .'" alt="Project afbeelding" width="720px" />';
	echo '</div>';
	echo '</div>';
	echo '</div>';
	return ob_get_clean();
}


function render_block_links($attributes){
	$img = $attributes['mediaUrl'];
	ob_start();
	echo '<div class="portfolio__block" id="" data-aos="fade-left" data-aos-delay="250">';
	echo '<div class="portfolio__block--container">';

	echo '<div class="portfolio__block--right '. ($attributes['class'] ? 'portfolio--noshadow' : null).'">';
	echo '<img src="'. $img .'" alt="Project afbeelding" width="720px" />';
	echo '</div>';


	echo '<div class="portfolio__block--left-two">';
	echo '<div class="portfolio__block--left-content">';
	echo '<h3>';
	echo $attributes['heading'];
	echo '</h3>';
	echo '<h4>';
	echo $attributes['subheading'];
	echo '</h4>';
	echo $attributes['content'];
	if ($attributes['button']) {
		echo '<a href="/contact/#contact">';
		echo $attributes['button'];
		echo '</a>';
	}
	echo '</div>';
	echo '</div>';

	echo '</div>';
	echo '</div>';
	return ob_get_clean();
}

function render_blocks_container($attributes, $content){
	ob_start();
	echo '<div class="expertise">';
    echo '<div class="expertise__container">';
	echo $content;
	echo '</div>';
	echo '</div>';
	return ob_get_clean();
}

function render_blocks_video($attributes) {
	ob_start();
	echo '<div class="portfolio__block" data-aos="fade-right" data-aos-delay="200">';
	echo '<div class="portfolio__block--container">';
	echo '<div class="portfolio__block--left">';
	echo '<div class="portfolio__block--left-content">';
	echo '<h3>';
	echo $attributes['heading'];
	echo '</h3>';
	echo '<h4>';
	echo $attributes['subheading'];
	echo '</h4>';
	echo $attributes['content'];
	echo '<a href="/contact/#contact">';
	echo $attributes['button'];
	echo '</a>';
	echo '</div>';
	echo '</div>';
	echo '<div class="portfolio__block--right">';
	echo $attributes['video'];
	echo '</div>';
	echo '</div>';
	echo '</div>';
	return ob_get_clean();
}
// Hook: Block assets.
add_action( 'init', 'my_block_cgb_block_assets' );
