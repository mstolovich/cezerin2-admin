import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import FlatButton from "material-ui/FlatButton"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import React from "react"
import messages from "../../../../lib/text"
import GroupSelect from "../../../../modules/customerGroups/select"
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation"
import Search from "./search"

const Fragment = React.Fragment

export default class Buttons extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      groupId: null,
      openSetGroup: false,
      openDelete: false,
    }
  }

  showSetGroup = () => {
    this.setState({ openSetGroup: true })
  }

  showDelete = () => {
    this.setState({ openDelete: true })
  }

  closeSetGroup = () => {
    this.setState({ openSetGroup: false })
  }

  closeDelete = () => {
    this.setState({ openDelete: false })
  }

  deleteCustomers = () => {
    this.setState({ openDelete: false })
    this.props.onDelete()
  }

  saveSetGroup = () => {
    this.setState({ openSetGroup: false })
    this.props.onSetGroup(this.state.groupId)
  }

  selectSetGroup = groupId => {
    this.setState({ groupId })
  }

  render() {
    const {
      search,
      setSearch,
      selectedCount,
      onDelete,
      onCreate,
      onEdit,
    } = this.props

    return (
      <Fragment>
        <Search value={search} setSearch={setSearch} />
        {selectedCount > 0 && (
          <Fragment>
            {selectedCount == 1 && (
              <IconButton
                touch={true}
                tooltipPosition="bottom-left"
                tooltip={messages.actions_edit}
                onClick={onEdit}
              >
                <FontIcon color="#fff" className="material-icons">
                  edit
                </FontIcon>
              </IconButton>
            )}
            <IconButton
              touch
              tooltipPosition="bottom-left"
              tooltip={messages.actions_delete}
              onClick={this.showDelete}
            >
              <FontIcon color="#fff" className="material-icons">
                delete
              </FontIcon>
            </IconButton>
            <IconButton
              touch
              tooltipPosition="bottom-left"
              tooltip={messages.customers_setGroup}
              onClick={this.showSetGroup}
            >
              <FontIcon color="#fff" className="material-icons">
                folder
              </FontIcon>
            </IconButton>
            <DeleteConfirmation
              open={this.state.openDelete}
              isSingle={false}
              itemsCount={selectedCount}
              onCancel={this.closeDelete}
              onDelete={this.deleteCustomers}
            />
            <Dialog
              title={messages.customers_setGroup}
              modal={false}
              open={this.state.openSetGroup}
              onRequestClose={this.closeSetGroup}
              autoScrollBodyContent
            >
              <GroupSelect
                onSelect={this.selectSetGroup}
                selectedId={this.state.groupId}
                showRoot
                showAll={false}
              />
              <DialogActions>
                <FlatButton
                  label={messages.cancel}
                  onClick={this.closeSetGroup}
                  style={{ marginRight: 10 }}
                />
                <FlatButton
                  label={messages.save}
                  primary
                  keyboardFocused
                  onClick={this.saveSetGroup}
                />
              </DialogActions>
            </Dialog>
          </Fragment>
        )}
        {selectedCount < 1 && (
          <IconButton
            touch={true}
            tooltipPosition="bottom-left"
            tooltip={messages.customers_titleAdd}
            onClick={onCreate}
          >
            <FontIcon color="#fff" className="material-icons">
              add
            </FontIcon>
          </IconButton>
        )}
      </Fragment>
    )
  }
}
