import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Books from '../book-all';
import CreateBook from '../book-create';
import BookDetails from '../book-details';
import Login from '../login';
import Register from '../register';
import Profile from '../profile';
import NotFoundRoute from '../not-found'

const Navigation = () => {
    return (
        <Router>
            <Switch>
                <Route path="/books/all" component={Books} />
                <Route path="/books/create" component={CreateBook} />
                <Route path="/books/edit/:id" component={CreateBook} />
                <Route path="/books/details/:id" component={BookDetails} />
                <Route path="/profile/login" component={Login} />
                <Route path="/profile/register" component={Register} />
                <Route path="/profile/profile" component={Profile} />
                <Route component={NotFoundRoute} />
            </Switch>
        </Router>
    )
}
export default Navigation