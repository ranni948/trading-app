import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import AddItemPage from '../components/AddItemPage';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import ViewItemPage from '../components/ViewItemPage';
import EditItemPage from '../components/EditItemPage';
import ViewMyItemsPage from '../components/ViewMyItemsPage';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/dashboard" component={DashboardPage} />
                <PrivateRoute path="/create" component={AddItemPage} />
                <PrivateRoute path="/view/:id" component={ViewItemPage} />
                <PrivateRoute path="/edit/:id" component={EditItemPage} />
                <PrivateRoute path="/selling" component={ViewMyItemsPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;