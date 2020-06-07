import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import Intro from './components/intro';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component= {Login} />
          <Route path="/signup" component = {Register} />
          <Route path="/tasks" component= {Home}/>
          <Route path="/" exact component= {Intro} />
        </Switch>
      </BrowserRouter>);
  }
}

export default App;
