import React from 'react';
import {Switch , Route } from 'react-router-dom';
import Layout from './hoc/layout';


import Home from './components/Home/home';
import BookView from './components/Books';
import Login from './containers/Admin/login';
import Auth from './hoc/auth';
import User from './components/Admin';
import AddReview from './containers/Admin/add';
import UserPosts from './containers/Admin/userPosts';
import EditReview from './containers/Admin/edit';
import UserRegister from './containers/Admin/register';
import Logout from './containers/Admin/logout';


const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Auth(Home , null)}/>
        <Route path="/books/:id" exact component={BookView} />
        <Route path="/login" exact component = {Auth(Login,false)} />
        <Route path="/user/logout" exact component = {Auth(Logout,true)} />
        <Route path="/user" exact component = {Auth(User,true)} />
        <Route path="/user/add" exact component ={Auth(AddReview,true)} />
        <Route path="/user/register" exact component ={Auth(UserRegister,true)} />
        <Route path="/user/edit-post/:id" exact component={Auth(EditReview,true)} />
        <Route path="/user/user-reviews" exact component ={Auth(UserPosts,true)} />
      </Switch>
    </Layout>
  )
}

export default Routes;
