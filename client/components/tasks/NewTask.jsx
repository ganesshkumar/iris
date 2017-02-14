import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { ListItem } from 'material-ui/List'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const NewTask = (props) => (
  <form onSubmit={props.handleSubmit} style={styles.form}>
    <Field type="text" name="text" component={renderTextField} fullWidth={true} label="New Task" autoComplete="off" />
    <RaisedButton type="submit" style={styles.hidden} label={"Create"} />
  </form>
)

const styles = {
  form: {
    padding: '20px'
  },
  hidden: {
    display: 'none'
  }
}

export default reduxForm({
  form: 'task',
})(NewTask)
