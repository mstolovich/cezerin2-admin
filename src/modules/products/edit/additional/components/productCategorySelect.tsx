import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import messages from 'lib/text'
import CategorySelect from 'modules/productCategories/select'
import FontIcon from 'material-ui/FontIcon'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import './style.sass'
const { Fragment } = React

export default class ProductCategorySelect extends React.Component {
	constructor(props) {
		super(props)
		state = {
			open: false,
		}
	}

	close = () => {
		setState({ open: false })
	}

	open = () => {
		setState({ open: true })
	}

	handleSelect = (categoryId) => {
		props.input.onChange(categoryId)
	}

	render() {
		const {
			categories,
			input,
			meta: { touched, error },
		} = props
		const { open } = state
		const selectedCategoryId = input.value
		const category = categories.find(
			(item) => item.id === selectedCategoryId
		)
		const categoryName = category ? category.name : ''

		const dialogButtons = [
			<FlatButton
				label={messages.cancel}
				onClick={close}
				style={{ marginRight: 10 }}
			/>,
			<FlatButton
				label={messages.save}
				primary
				keyboardFocused
				onClick={close}
			/>,
		]

		return (
			<Fragment>
				<Dialog
					title={messages.category}
					actions={dialogButtons}
					modal={false}
					open={open}
					onRequestClose={close}
					autoScrollBodyContent
				>
					<CategorySelect
						onSelect={handleSelect}
						selectedId={selectedCategoryId}
						opened={false}
					/>
				</Dialog>
				<FlatButton
					label={categoryName}
					onClick={open}
					icon={
						<FontIcon color="#777" className="material-icons">
							create
						</FontIcon>
					}
				/>
			</Fragment>
		)
	}
}
