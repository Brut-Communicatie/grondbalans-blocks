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
registerBlockType( 'cgb/grondbalans-contact-grondbank', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Grondbalans - Contact Grondbank' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'contactpersoon' ),
		__( 'grondbalans' ),
	],
	attributes: {
		mediaId: {
			type: 'number',
		},
		mediaUrl: {
			type: 'string'
		},
		naam: {
			type: 'string'
		},
		regio: {
			type: 'string'
		},
		tel: {
			type: 'string'
		},
		mail: {
			type: 'string'
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
		function updateValue (e) {
			props.setAttributes ( {
				naam: e.target.value,
			});
		}
		function updateName (e) {
			props.setAttributes ( {
				naam: e.target.value,
			});
		}

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

		const updateFunction = (e) =>{
			props.setAttributes({
				regio: e.target.value,
			});
		}

		const updateTel = (e) =>{
			props.setAttributes({
				tel: e.target.value,
			});
		}
		
		const updateMail = (e) =>{
			props.setAttributes({
				mail: e.target.value,
			});
		}
	
		return (
			<div className="editor__persoon editor__grondbank">
                				<div className="editor__persoon--foto">
		
					<img src="https://mlmotgafwbhj.i.optimole.com/u0PFPh0-3jDNiD8Z/w:250/h:250/q:75/rt:fill/g:ce/https://grondbalans.nl/wp-content/uploads/2020/04/Afbeelding4-1.png" width="100px" />
			

	



                </div>
                <div className="editor__persoon--info">
				<input type="text" onBlur={updateName} onChange={updateValue} value={props.attributes.naam} placeholder="Naam"/>
				<input type="text" onBlur={updateFunction} onChange={updateFunction} value={props.attributes.regio} placeholder="Regio"/>
				<input type="text" onBlur={updateTel} onChange={updateTel} value={props.attributes.tel} placeholder="Telefoonnummer"/>
				<input type="text" onBlur={updateMail} onChange={updateMail} value={props.attributes.mail} placeholder="E-mailadres"/>
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

