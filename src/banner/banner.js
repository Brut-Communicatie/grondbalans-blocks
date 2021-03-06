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
const {  MediaUpload } = wp.blockEditor;
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
registerBlockType( 'cgb/grondbalans-banner', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Grondbalans - Banner' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'grondbalans' ),
		__( 'grondbalans banner' ),
	],
	attributes: {
        mediaUrl: {
            type: 'string',
        },
        mediaId: {
            type: 'number',
        },
        heading: {
            type: 'string',
        },
        content: {
            type: 'string',
        },
        link: {
            type: 'string',
        },
        button: {
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
        const removeMedia = () => {
			props.setAttributes({
				mediaId: 0,
				mediaUrl: ''
			});
        }
		 const onSelectMedia = (media) => {
			props.setAttributes({
				mediaId: media.id,
				mediaUrl: media.url
			});
        }

        const changeHeading = (text) => {
            props.setAttributes({
                heading: text,
            });
        }

        const changeContent = (text) => {
            props.setAttributes({
                content: text,
            });
        }

        const changeButton = (text) => {
            props.setAttributes({
                button: text,
            });
        }

        const changeLink = (text) => {
            props.setAttributes({
                link: text,
            });
        }
        console.log(props);
        
		return (
			<div className={ props.className }>
                <h2>Banner</h2>
                <h3>Banner afbeelding</h3>
                {props.attributes.mediaUrl != "" ? 
				(
					<div>
					<img src={props.attributes.mediaUrl} width="250px" />
					</div>
				)
				: null}

				<MediaUpload
					title={__('Replace image', 'awp')}
					value={props.attributes.mediaId}
					onSelect={onSelectMedia}
					allowedTypes={['image']}
					render={({open}) => (
						<a onClick={open} isDefault isLarge>{__('Selecteer of verander afbeelding', 'awp')}</a>
					)}
				/>
                <br />
                <a onClick={removeMedia}>Verwijder afbeelding</a>
                <h3>Banner content</h3>
                <TextControl 
                    label="Banner kop"
                    value={ props.attributes.heading }
                    onChange={ (value) => changeHeading(value) }
                />
                <TextareaControl 
                    label="Banner content"
                    value={ props.attributes.content }
                    onChange={ (value) => changeContent(value) }
                />
                <h3>Banner button</h3>
                <TextControl 
                    label="Button tekst"
                    value={ props.attributes.button }
                    onChange={ (value) => changeButton(value) }
                />
                <TextControl 
                    label="Button link"
                    value={ props.attributes.link }
                    onChange={ (value) => changeLink(value) }
                />
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
