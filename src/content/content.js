/**
 * BLOCK: my-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

import { TextControl, TextareaControl } from '@wordpress/components';
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/grondbalans-content', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Grondbalans - Content' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'grondbalans content' ),
		__( 'grondbalans' ),
	],
	attributes: {
        heading: { 
            type: 'string',
        },
        subheading: {
            type: 'string',
        },
        content: {
            type: 'string',
        },
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {
		// Creates a <p class='wp-block-cgb-block-my-block'></p>.
        console.log(props);
        
        const updateTitle = (txt) => {
            props.setAttributes({
                heading: txt,
            });
        }
        const updateSubheading = (txt) => {
            props.setAttributes({
                subheading: txt,
            });
        }
        const updateContent = (txt) => {
            props.setAttributes({
                content: txt,
            });
        }

        


		return (
            <div>
                <h2>Intro</h2>
                <div className="grondbalans__content">
                    <TextControl 
                        label="Heading"
                        value={ props.attributes.heading }
                        onChange={ (value) => updateTitle(value) }
                    />
                    <TextControl 
                        label="Subheading"
                        value={ props.attributes.subheading }
                        onChange={ (value) => updateSubheading(value) }
                    />
                    <TextareaControl 
                        label="Content"
                        value={ props.attributes.content }
                        onChange={ (value) => updateContent(value) }
                    />
                </div>
            </div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		return null
	},
} );
