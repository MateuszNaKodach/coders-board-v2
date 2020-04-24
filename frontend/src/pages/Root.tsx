import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import SignIn from './SignIn';
import Dashboard from './Dashboard';
import Projects from './Projects';
import Users from './Users';
import Materials from './Materials';
import Roles from './Roles';
import SettingsWrapper from './settings/SettingsWrapper';

import AppWrapper from './AppWrapper';
import AdminWrapper from './admin/AdminWrapper';
import AdminCredentials from './admin/Credentials';

import ProfileSettings from './settings/Profile';
import SkillsSettings from './settings/Skills';
import IntegrationsSettings from './settings/Integrations';

const Root = () => (
  <Switch>
    <Route path="/sign-in" component={SignIn} />
    <Route path="/">
      <AppWrapper>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/projects" component={Projects} />
          <Route path="/users" component={Users} />
          <Route path="/materials" component={Materials} />
          <Route path="/roles" component={Roles} />
          <Route path="/settings">
            <SettingsWrapper>
              <Switch>
                <Redirect exact from="/settings" to="/settings/profile" />
                <Route path="/settings/profile" component={ProfileSettings} />
                <Route path="/settings/skills" component={SkillsSettings} />
                <Route path="/settings/integrations" component={IntegrationsSettings} />
              </Switch>
            </SettingsWrapper>
          </Route>
          <AdminWrapper>
            <Redirect exact from="/dashboard" to="/admin/credentials" />
            <Switch>
              <Route path="/admin/credentials" component={AdminCredentials} />
            </Switch>
          </AdminWrapper>
        </Switch>
      </AppWrapper>
    </Route>
  </Switch>
);

Root.whyDidYouRender = true;

export default Root;
