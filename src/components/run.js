import React from 'react'
import ReactDOM from 'react-dom'
import {
    hashHistory,
    Route,
    Router
}  from 'react-router';

import App from './App'
import Register from './Register'
import ViewUsers from './ViewUsers'
import '../styles/app.css'
import '../styles/bootstrap.css'

const Components=(
    <Router history={hashHistory}>
       <Route path="/" component={App}/>
       <Route path="/register" component={Register}/>
      <Route path="/viewusers" component={ViewUsers}/>
    </Router>
);

ReactDOM.render(Components, document.getElementById('app')); 
