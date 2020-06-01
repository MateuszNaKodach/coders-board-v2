import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home } from '@pages/Home';
import { LoginView } from '@pages/LoginView'


export const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={LoginView} />
  </Switch>
  
);
