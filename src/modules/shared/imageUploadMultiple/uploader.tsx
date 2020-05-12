import RaisedButton from "material-ui/RaisedButton"
import Snackbar from "material-ui/Snackbar"
import React from "react"
import Dropzone from "react-dropzone"
import messages from "../../../lib/text"
import style from "./style.css"

export default class MultiUploader extends React.Component {
  onDrop = files => {
    const form = new FormData()
    files.map(file => {
      form.append("file", file)
    })
    this.props.onUpload(form)
  }

  render() {
    const { uploading } = this.props

    return (
      <div>
        <Dropzone
          onDrop={this.onDrop}
          multiple
          disableClick
          noClick
          accept="image/*"
          ref={node => {
            this.dropzone = node
          }}
          style={{}}
          className={style.dropzone}
          activeClassName={style.dropzoneActive}
          rejectClassName={style.dropzoneReject}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {this.props.children != null ? (
                this.props.children
              ) : (
                <div className={style.dropzoneEmpty}>
                  {messages.help_dropHere}
                </div>
              )}{" "}
            </div>
          )}
        </Dropzone>

        {!uploading && (
          <RaisedButton
            primary
            label={messages.chooseImage}
            style={{ marginLeft: 20, marginTop: 10 }}
            onClick={() => {
              this.dropzone.open()
            }}
          />
        )}

        <Snackbar open={uploading} message={messages.messages_uploading} />
      </div>
    )
  }
}
