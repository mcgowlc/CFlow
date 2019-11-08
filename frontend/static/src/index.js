import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {ReactBootstrap, Table} from 'react-bootstrap-table';
import BaseLayout from './components/BaseLayout';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import JobList from './components/JobList';
import JobItem from './components/JobItem';
import JobAdd from './components/JobAdd';
import JobEdit from './components/JobEdit';
import JobDetail from './components/JobDetail';




ReactDOM.render(<BrowserRouter>
  <BaseLayout>
      <Switch>
          <Route path="/accounts/login" component={Login}/>
          <Route path="/accounts/register" component={Register}/>
          <Route path="/schedule/" component={JobList}/>
          <Route path="/jobs/new/" component={JobAdd} />
          <Route path="/jobs/edit/:id/" component={JobEdit} />
          <Route path="/jobs/detail/:id/" component={JobDetail}/>
          // <Route path="/jobs/detail/:id/edit/" component={JobEdit} />

          <Route exact path="/" component={Home}/>
      </Switch>
  </BaseLayout>
</BrowserRouter>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
