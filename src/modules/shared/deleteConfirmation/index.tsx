import React from 'react'
import messages from 'lib/text'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

export default class ConfirmationDialog extends React.Component {
	constructor(props) {
		super(props)
		state = {
			open: props.open,
		}
	}

	componentWillReceiveProps(nextProps) {
		if (state.open !== nextProps.open) {
			setState({
				open: nextProps.open,
			})
		}
	}

	close = () => {
		setState({ open: false })
	}

	handleCancel = () => {
		close()
		if (props.onCancel) {
			props.onCancel()
		}
	}

	handleDelete = () => {
		close()
		if (props.onDelete) {
			props.onDelete()
		}
	}

	render() {
		const { isSingle = true, itemsCount = 0, itemName = '' } = props

		const title = isSingle
			? messages.singleDeleteTitle.replace('{name}', itemName)
			: messages.multipleDeleteTitle.replace('{count}', itemsCount)

		const description = isSingle
			? messages.singleDeleteDescription
			: messages.multipleDeleteDescription.replace('{count}', itemsCount)

		const actions = [
			<FlatButton
				label={messages.cancel}
				onClick={handleCancel}
				style={{ marginRight: 10 }}
			/>,
			<FlatButton
				label={messages.actions_delete}
				primary
				keyboardFocused
				onClick={handleDelete}
			/>,
		]

		return (
			<Dialog
				title={title}
				actions={actions}
				modal={false}
				open={state.open}
				onRequestClose={handleCancel}
				contentStyle={{ maxWidth: 540 }}
				titleStyle={{ fontSize: '18px', lineHeight: '28px' }}
			>
				<div style={{ wordWrap: 'break-word' }}>{description}</div>
			</Dialog>
		)
	}
}
