import React, { useContext } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Books from '../../pages/book-all';
import CreateBook from '../../pages/book-create';
import BookDetails from '../../pages/book-details';
import Login from '../../pages/login';
import Register from '../../pages/register';
import Profile from '../../pages/profile';
import NotFoundRoute from '../../pages/not-found'
import { UserContext } from '../../Context';

const Navigation = () => {
    const { isLoggedIn } = useContext(UserContext);
    console.log('isUserLogged: ', isLoggedIn)
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Books} />
                <Route path="/books/all" component={Books} />
                <Route path="/books/create">
                    {isLoggedIn ? (<CreateBook />) : (<Redirect to="/profile/login" />)}
                </Route>
                <Route path="/books/edit/:id">
                    {isLoggedIn ? (<CreateBook />) : (<Redirect to="/profile/login" />)}
                </Route>
                <Route path="/books/details/:id">
                    {isLoggedIn ? (<BookDetails />) : (<Redirect to="/profile/login" />)}
                </Route>
                <Route path="/profile/login">
                    {!isLoggedIn ? (<Login />) : (<Redirect to="/books/all" />)}
                </Route>
                <Route path="/profile/register">
                    {!isLoggedIn ? (<Register />) : (<Redirect to="/books/all" />)}
                </Route>
                <Route path="/profile/profile">
                    {isLoggedIn ? (<Profile />) : (<Redirect to="/profile/login" />)}
                </Route>
                <Route component={NotFoundRoute} />
            </Switch>
        </Router >
    )
}
export default Navigation