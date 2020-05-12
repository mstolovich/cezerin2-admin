import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import FlatButton from "material-ui/FlatButton"
import React from "react"
import messages from "../../../lib/text"

export default class ConfirmationDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: props.open,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.open !== nextProps.open) {
      this.setState({
        open: nextProps.open,
      })
    }
  }

  close = () => {
    this.setState({ open: false })
  }

  handleCancel = () => {
    this.close()
    if (this.props.onCancel) {
      this.props.onCancel()
    }
  }

  handleDelete = () => {
    this.close()
    if (this.props.onDelete) {
      this.props.onDelete()
    }
  }

  render() {
    const { isSingle = true, itemsCount = 0, itemName = "" } = this.props

    const title = isSingle
      ? messages.singleDeleteTitle.replace("{name}", itemName)
      : messages.multipleDeleteTitle.replace("{count}", itemsCount)

    const description = isSingle
      ? messages.singleDeleteDescription
      : messages.multipleDeleteDescription.replace("{count}", itemsCount)

    return (
      <Dialog
        title={title}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleCancel}
        contentStyle={{ maxWidth: 540 }}
        titleStyle={{ fontSize: "18px", lineHeight: "28px" }}
      >
        <div style={{ wordWrap: "break-word", width: "500px", margin: "25px" }}>
          {description}
        </div>
        <DialogActions>
          <FlatButton
            label={messages.cancel}
            onClick={this.handleCancel}
            style={{ marginRight: 10 }}
          />
          <FlatButton
            label={messages.actions_delete}
            primary
            keyboardFocused
            onClick={this.handleDelete}
          />
        </DialogActions>
      </Dialog>
    )
  }
}
