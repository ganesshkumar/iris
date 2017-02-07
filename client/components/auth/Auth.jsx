import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import AuthForm from './AuthForm'
import { connect } from 'react-redux'
import SubscribeComponent from '../../helpers/SubscriberComponent'
import { Link } from 'react-router'
import { selectForm, signup, login } from '../../actions/authActions'

class Auth extends Component {
  constructor(props) {
    super(props)
    this.redirectIfLoggedIn(props)
  }

  componentWillReceiveProps(nextProps) {
    this.redirectIfLoggedIn(nextProps)
  }

  redirectIfLoggedIn(props) {
    if (Object.keys(props.user).length > 0) {
      window.location.href = '#'
    }
  }

  render() {
    return (
      <AuthForm
        formName={this.props.form}
        selectLoginForm={this.props.selectLoginForm}
        selectSignupForm={this.props.selectSignupForm}
        onSubmit={this.props.form === "LOGIN_FORM" ? this.props.login : this.props.signup}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.loggedInUser,
    form: state.authForm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectLoginForm: () => dispatch(selectForm('LOGIN_FORM')),
    selectSignupForm: () => dispatch(selectForm('SIGNUP_FORM')),
    signup: (values) => dispatch(signup(values.username, values.email, values.password)),
    login: (values) => dispatch(login(values.username, values.password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeComponent(Auth))
