import React from 'react'
import { render } from 'react-dom'

// First we import some modules...
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { App, Home } from './components/App/App'
import { Dashboard, Guide }from './components/App/Dashboard'
import { Upload } from './components/App/Upload'
import { Process } from './components/App/Process'
import '../semantic/dist/semantic.min.css'




render((
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ Home } />
    </Route>
    <Route path="/dashboard" component={ Dashboard }>
      <IndexRoute component={ Guide } />
      <Route path="upload" component={ Upload } />
      <Route path="process" component={ Process } />
    </Route>
  </Router>
  ), document.getElementById('root'))