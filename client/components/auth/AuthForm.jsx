import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {Tabs, Tab} from 'material-ui/Tabs'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const AuthForm = (props) => {
  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={props.handleSubmit}>
        <Tabs value={props.formName} style={{width: '100%'}}>
          <Tab label="Login" value="LOGIN_FORM" onActive={props.selectLoginForm} />
          <Tab label="Signup" value="SIGNUP_FORM" onActive={props.selectSignupForm} />
        </Tabs>

        <Field type="text" name="username" component={renderTextField} label="Username"/>
        <Field type="text" name="email" component={renderTextField} label="Email"/>
        <Field type="password" name="password" component={renderTextField} label="Password"/>
        <RaisedButton type="submit" primary={true} label={props.formName === "LOGIN_FORM" ? "Login" : "Signup"} />
      </form>
    </div>
  )
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  }
}

export default reduxForm({
  form: 'authForm',
  validate: null
})(AuthForm)
