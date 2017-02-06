import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
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
    return (
      <div className="container">
        <header>
          <AppBar
            title="Iris"
            style={{fontFamily: 'Syncopate, sans-serif'}}
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />

          <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new tasks"
              />
          </form>
        </header>

        <Tasks />
      </div>
    );
  }
}

export default SubscribeComponent(App)
