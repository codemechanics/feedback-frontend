import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import OrganizationPage from './components/organization/OrganizationsPage';
import ManageOrganizationPage from './components/organization/ManageOrganizationPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="organizations" component={OrganizationPage}/>
    <Route path="organization/:id" component={ManageOrganizationPage}/>
  </Route>
);
