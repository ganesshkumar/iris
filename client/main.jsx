import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import App from './components/App.jsx'
import Auth from './components/auth/Auth'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Tasks from './components/tasks/Tasks'
import Dashboard from './components/dashboard/Dashboard'
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
        <Router history={hashHistory}>
            <Route path="/" component={App}>
              <IndexRoute component={Tasks}/>
              <Route path="tasks" component={Tasks} />
              <Route path="dashboard" component={Dashboard} />
              <Route path="auth" component={Auth} />
            </Route>
        </Router>
      </MuiThemeProvider>
    </Provider>
  ), document.getElementById('render-target'));
});
