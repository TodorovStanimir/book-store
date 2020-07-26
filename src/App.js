import React, { Component } from 'react';
import UserContext from './Context';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            user: null
        }
    }


    logIn = (user) => {
        this.setState({
            isLoggedIn: true,
            user
        })
    }

    logOut = () => {
        this.setState({
            isLoggedIn: false,
            user: null
        })
    }

    render() {
        const {
            isLoggedIn,
            user
        } = this.state;
        return (
            <UserContext.Provider value={{
                isLoggedIn,
                user,
                logIn: this.logIn,
                logOut: this.logOut
            }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default App;