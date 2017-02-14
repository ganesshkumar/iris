import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Meteor } from 'meteor/meteor'
import SubscribeComponent from '../helpers/SubscriberComponent'

import Drawer from 'material-ui/Drawer'
import Menu from 'material-ui/svg-icons/navigation/menu'
import Dashboard from 'material-ui/svg-icons/action/dashboard'
import List from 'material-ui/svg-icons/action/view-list'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import Tasks from './tasks/Tasks'

import { setDrawerState } from '../actions/applicationActions'
import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  componentWillMount() {
    this.props.subscribe('tasks')
    this.props.subscribe('tasksOrder')
  }

  render() {
    const showAppbar = this.props.location.pathname.includes('/auth') ? false : true
    const menu = (
      <IconButton>
        <Menu onClick={this.props.openDrawer}/>
      </IconButton>
    )

    return (
      <div style={styles.container}>
        {showAppbar && <header>
          <AppBar
            title="Iris"
            style={styles.title}
            iconElementLeft={menu}
          />

          <Drawer open={this.props.isDrawerOpened} docked={false}
                onRequestChange={ status => (status == false && this.props.closeDrawer())} >
            <AppBar title="Iris" style={styles.title} showMenuIconButton={false} />

            <MenuItem
                leftIcon={<Dashboard />}
                onTouchTap={(e) => this.props.redirectAndClose('#dashboard')}>
              Dashboard
            </MenuItem>

            <MenuItem
                leftIcon={<List />}
                onTouchTap={(e) => this.props.redirectAndClose('#tasks')}>
              Tasks
            </MenuItem>
          </Drawer>

        </header>}

        {this.props.children}
      </div>
    );
  }
}

const styles = {
  container: {
    height: '100%'
  },
  title: {
    fontFamily: 'Syncopate, sans-serif'
  }
}

const mapStateToProps = state => {
  return {
    isDrawerOpened: state.appProps.isDrawerOpened
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openDrawer: () => dispatch(setDrawerState(true)),
    closeDrawer: () => dispatch(setDrawerState(false)),
    redirectAndClose: (link) => {
      window.location.href = link
      dispatch(setDrawerState(false))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeComponent(App))
