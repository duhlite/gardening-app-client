import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Beds from "./containers/Beds";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewBed from "./containers/NewBed";
import NotFound from "./containers/NotFound";
import NewPlant from "./containers/NewPlant";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/garden/new" exact component={NewBed} props={childProps} />
    <AuthenticatedRoute path="/garden/:id" exact component={Beds} props={childProps} />
    <AuthenticatedRoute path="/garden/addplant/:id" exact component={NewPlant} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
