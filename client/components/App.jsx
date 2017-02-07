import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import SubscribeComponent from '../helpers/SubscriberComponent'

import AppBar from 'material-ui/AppBar';
import Tasks from './tasks/Tasks'

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  componentWillMount() {
    this.props.subscribe('tasks')
  }

  handleSubmit(event) {
    event.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim()

    Tasks.insert({
      text,
      createdAt: new Date(),
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = ''
  }

  render() {
    const showAppbar = this.props.location.pathname.includes('/auth') ? false : true


    return (
      <div style={styles.container}>
        {showAppbar && <header>
          <AppBar
            title="Iris"
            style={{fontFamily: 'Syncopate, sans-serif'}}
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
      </header>}

        {this.props.children}
      </div>
    );
  }
}

const styles = {
  container: {
    height: '100%'
  }
}

export default SubscribeComponent(App)
