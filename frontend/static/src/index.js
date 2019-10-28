import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import BaseLayout from './components/BaseLayout';
import Login from './components/Login';
import Register from './components/Register';




ReactDOM.render(<BrowserRouter>
  <BaseLayout>
      <Switch>
          <Route path="/accounts/login" component={Login}/>
          <Route path="/accounts/register" component={Register}/>
      </Switch>
  </BaseLayout>
</BrowserRouter>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
