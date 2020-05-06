import React, { useState, useEffect } from "react"
import { Field, reduxForm } from "redux-form"
import { TextField, SelectField } from "redux-form-material-ui"

import api from "../../../../lib/api"
import messages from "../../../../lib/text"

import FlatButton from "material-ui/FlatButton"
import MenuItem from "material-ui/MenuItem"
import "./style.sass"

const validate = values => {
  const errors = {}
  const requiredFields = ["email", "full_name"]

  requiredFields.map(field => {
    if (values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

const CustomerEditForm = props => {
  const [groups, setGroups] = useState([])

  useEffect(() => {
    api.customerGroups.list().then(({ json }) => {
      setGroups(json)
    })
  }, [])

  const { handleSubmit, pristine, submitting, initialValues, onCancel } = props

  const groupItems = groups.map((item, index) => (
    <MenuItem key={index} value={item.id} primaryText={item.name} />
  ))
  groupItems.push(
    <MenuItem
      key="none"
      value={null}
      primaryText={messages.customers_noGroup}
    />
  )

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "initial",
        width: "100%",
      }}
    >
      <>
        <Field
          component={TextField}
          fullWidth
          name="full_name"
          floatingLabelText={messages.fullName}
        />
        <Field
          component={SelectField}
          fullWidth
          name="group_id"
          floatingLabelText={messages.group}
        >
          {groupItems}
        </Field>
        <Field
          component={TextField}
          fullWidth
          name="email"
          floatingLabelText={messages.email}
        />
        <Field
          component={TextField}
          fullWidth
          name="mobile"
          floatingLabelText={messages.mobile}
        />
        <Field
          component={TextField}
          fullWidth
          name="note"
          floatingLabelText={messages.note}
          multiLine
        />
      </>
      <div className="shippingButtons">
        <FlatButton label={messages.cancel} onClick={onCancel} />
        <FlatButton
          label={messages.save}
          primary
          type="submit"
          style={{ marginLeft: 12 }}
          disabled={pristine || submitting}
        />
      </div>
    </form>
  )
}

export default reduxForm({
  form: "CustomerEditForm",
  validate,
  enableReinitialize: true,
})(CustomerEditForm)
