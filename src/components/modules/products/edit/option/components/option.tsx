import React, { useEffect } from "react"
import { Link } from "gatsby"
import { Field, reduxForm } from "redux-form"
import { TextField, SelectField } from "redux-form-material-ui"
import { CustomToggle } from "modules/shared/form"

import messages from "lib/text"

import Paper from "material-ui/Paper"
import FlatButton from "material-ui/FlatButton"
import RaisedButton from "material-ui/RaisedButton"
import MenuItem from "material-ui/MenuItem"
import "./style.sass"
import OptionValues from "./values"

const validate = values => {
  const errors = {}
  const requiredFields = ["name"]

  requiredFields.map(field => {
    if (values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

const ProductOptionForm = props => {
  useEffect(() => {
    props.fetchData()
  }, [])

  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    initialValues,
    deleteOption,
    optionValues,
    createOptionValue,
    updateOptionValue,
    deleteOptionValue,
  } = props

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Paper className="paper-box" zDepth={1}>
          <div className="innerBox">
            <Field
              name="name"
              component={TextField}
              floatingLabelText={messages.optionName}
              fullWidth
            />
            <div className="row">
              <div className="col-xs-6">
                <Field
                  name="position"
                  component={TextField}
                  type="number"
                  floatingLabelText={messages.position}
                  fullWidth
                />
              </div>
              <div className="col-xs-6">
                <Field
                  component={SelectField}
                  autoWidth
                  fullWidth
                  name="control"
                  floatingLabelText={messages.optionControl}
                >
                  <MenuItem
                    value="select"
                    primaryText={messages.optionControlSelect}
                  />
                </Field>
              </div>
            </div>
            <div className="shortControl">
              <Field
                name="required"
                component={CustomToggle}
                label={messages.settings_fieldRequired}
              />
            </div>
          </div>
          <div className="buttons-box">
            <RaisedButton
              label={messages.actions_delete}
              secondary
              onClick={deleteOption}
            />
            <FlatButton
              label={messages.cancel}
              style={{ marginLeft: 12 }}
              onClick={reset}
              disabled={pristine || submitting}
            />
            <RaisedButton
              type="submit"
              label={messages.save}
              primary
              className="button"
              disabled={pristine || submitting}
            />
          </div>
        </Paper>
      </form>
      <OptionValues
        optionValues={optionValues}
        createOptionValue={createOptionValue}
        updateOptionValue={updateOptionValue}
        deleteOptionValue={deleteOptionValue}
      />
    </>
  )
}

export default reduxForm({
  form: "ProductOptionForm",
  validate,
  enableReinitialize: true,
})(ProductOptionForm)
