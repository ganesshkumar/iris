import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import App from './components/App.jsx'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import configureStore from './store/configureStore'
import customTheme from './theme'

const store = configureStore();

Meteor.startup(() => {
  render((
    <Provider store={store}>
      <MuiThemeProvider
          muiTheme={getMuiTheme(Object.assign({}, lightBaseTheme, customTheme))} >
        <Router history={browserHistory}>
            <Route path="/" component={App} />
        </Router>
      </MuiThemeProvider>
    </Provider>
  ), document.getElementById('render-target'));
});
