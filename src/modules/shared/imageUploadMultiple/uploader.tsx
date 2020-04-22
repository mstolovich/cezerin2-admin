import React from 'react'
import Dropzone from 'react-dropzone'
import messages from 'lib/text'

import Snackbar from 'material-ui/Snackbar'
import RaisedButton from 'material-ui/RaisedButton'
import style from './style.css'

export default class MultiUploader extends React.Component {
	onDrop = (files) => {
		const form = new FormData()
		files.map((file) => {
			form.append('file', file)
		})
		props.onUpload(form)
	}

	render() {
		const { uploading } = props

		return (
			<div>
				<Dropzone
					onDrop={onDrop}
					multiple
					disableClick
					noClick
					accept="image/*"
					ref={(node) => {
						dropzone = node
					}}
					style={{}}
					className="dropzone}
					activeClassName="dropzoneActive}
					rejectClassName="dropzoneReject}
				>
					{({ getRootProps, getInputProps }) => (
						<div {...getRootProps()}>
							<input {...getInputProps()} />
							{props.children != null ? (
								props.children
							) : (
								<div className="dropzoneEmpty}>
									{messages.help_dropHere}
								</div>
							)}{' '}
						</div>
					)}
				</Dropzone>

				{!uploading && (
					<RaisedButton
						primary
						label={messages.chooseImage}
						style={{ marginLeft: 20, marginTop: 10 }}
						onClick={() => {
							dropzone.open()
						}}
					/>
				)}

				<Snackbar
					open={uploading}
					message={messages.messages_uploading}
				/>
			</div>
		)
	}
}
