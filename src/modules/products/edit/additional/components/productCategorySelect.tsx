import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import FlatButton from "material-ui/FlatButton"
import FontIcon from "material-ui/FontIcon"
import React from "react"
import messages from "../../../../../lib/text"
import CategorySelect from "../../../../../modules/productCategories/select"
const { Fragment } = React

export default class ProductCategorySelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  close = () => {
    this.setState({ open: false })
  }

  open = () => {
    this.setState({ open: true })
  }

  handleSelect = categoryId => {
    this.props.input.onChange(categoryId)
  }

  render() {
    const {
      categories,
      input,
      meta: { touched, error },
    } = this.props
    const { open } = this.state
    const selectedCategoryId = input.value
    const category = categories.find(item => item.id === selectedCategoryId)
    const categoryName = category ? category.name : ""

    return (
      <Fragment>
        <Dialog
          title={messages.category}
          modal={false}
          open={open}
          onRequestClose={this.close}
          autoScrollBodyContent
        >
          <CategorySelect
            onSelect={this.handleSelect}
            selectedId={selectedCategoryId}
            opened={false}
          />
          <DialogActions>
            <FlatButton
              label={messages.cancel}
              onClick={this.close}
              style={{ marginRight: 10 }}
            />
            <FlatButton
              label={messages.save}
              primary
              keyboardFocused
              onClick={this.close}
            />
          </DialogActions>
        </Dialog>
        <FlatButton
          label={categoryName}
          onClick={this.open}
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
