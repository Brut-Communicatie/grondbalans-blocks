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
registerBlockType( 'cgb/block-my-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Grondbank' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'grondbank' ),
		__( 'grondbalans' ),
	],
	attributes: {
		mediaId: {
			type: 'number',
		},
		mediaUrl: {
			type: 'string'
		},
		grondbankName: {
			type: 'string'
		},
		grondbankAdres: {
			type: 'string'
		},
		grondbankStraat: {
			type : 'string'
		},
		grondbankContact: {
			type: 'string'
		},
		grondbankTel: {
			type: 'string'
		},
		grondbankMail: {
			type: 'string'
		},
		logoUrl : {
			type: 'string'
		},
		logoId : {
			type: 'number'
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
				grondbankName: e.target.value,
			});
		}
		function updateName (e) {
			props.setAttributes ( {
				grondbankName: e.target.value,
			});
		}

		const removeMedia = () => {
			props.setAttributes({
				mediaId: 0,
				mediaUrl: ''
			});
		}

		const updateContact = (e) => {
			props.setAttributes({
				grondbankContact: e.target.value,
			});
		}

		 const onSelectMedia = (media) => {
			props.setAttributes({
				mediaId: media.id,
				mediaUrl: media.url
			});
		}

		const removeLogo = () => {
			props.setAttributes({
				logoId: 0,
				logoUrl: ''
			});
		}

		 const onSelectLogo = (media) => {
			props.setAttributes({
				logoId: media.id,
				logoUrl: media.url
			});
		}

		const updateStreetName = (e) =>{
			props.setAttributes({
				grondbankStraat: e.target.value,
			});
		}

		const updateAdres = (e) =>{
			props.setAttributes({
				grondbankAdres: e.target.value,
			});
		}

		const updateTel = (e) =>{
			props.setAttributes({
				grondbankTel: e.target.value,
			});
		}
		
		const updateMail = (e) =>{
			props.setAttributes({
				grondbankMail: e.target.value,
			});
		}
		

		return (
			<div className={ props.className }>
				<h1>Grondbank {props.attributes.grondbankName != "" ? props.attributes.grondbankName : null}</h1>
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

				<br/>

				<a onClick={removeMedia}>Verwijder afbeelding</a>

				<br />	<br />
				<input type="text" onBlur={updateName} onChange={updateValue} value={props.attributes.grondbankName} placeholder="Grondbank locatie"/>
				<br/>
				<input type="text" onBlur={updateStreetName} onChange={updateStreetName} value={props.attributes.grondbankStraat} placeholder="Grondbank straat"/>
				<br/>
				<input type="text" onBlur={updateAdres} onChange={updateAdres} value={props.attributes.grondbankAdres} placeholder="Grondbank adres"/>

				<br/>
				<input type="text" onBlur={updateContact} onChange={updateContact} value={props.attributes.grondbankContact} placeholder="Contactpersoon"/>

				<br/>
				<input type="text" onBlur={updateTel} onChange={updateTel} value={props.attributes.grondbankTel} placeholder="Telefoonnummer"/>

				<br/>
				<input type="text" onBlur={updateMail} onChange={updateMail} value={props.attributes.grondbankMail} placeholder="E-mailadres"/>
				<br />	<br />

				{props.attributes.logoUrl != "" ? 
				(
					<div>
					<img src={props.attributes.logoUrl} width="250px"/>
					</div>
				)
				: null}

				<MediaUpload
					title={__('Replace image', 'awp')}
					value={props.attributes.logoUrl}
					onSelect={onSelectLogo}
					allowedTypes={['image']}
					render={({open}) => (
						<a onClick={open} isDefault isLarge>{__('Selecteer of verander logo', 'awp')}</a>
					)}
				/>

				<br/>

				<a onClick={removeLogo}>Verwijder logo</a>
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
