import React, { Component, Fragment } from 'react';
import UserContext from './Context';
import getCookie from './utils/getCookie';
import userService from './services/user-service';
import Notification from './components/notification';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: null,
            user: null,
            message: '',
            show: false
        }
    }

    logIn = (user) => {
        this.setState({
            isLoggedIn: true,
            user
        })
    }

    logOut = async () => {
        const token = getCookie('x-auth-token');

        try {
            if (token) {
                await userService.logoutUser(token);
            }

            document.cookie = 'x-auth-token=; expires = Thu, 01 Jan 1970 00:00:00 GMT';

            this.setState({
                isLoggedIn: false,
                user: null
            })

        } catch (error) {
            this.setState({ message: error.status, show: true })
            setTimeout(() => {
                this.setState({ message: '', show: false })
            }, 3000)
        }
    }

    componentDidMount() {
        const token = getCookie('x-auth-token');

        if (!token || token === '') {
            this.logOut();
            return
        }

        fetch('http://localhost:4000/api/user/verify', {
            method: 'POST',
            body: JSON.stringify({
                token
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => {
            console.log(promise);
            return promise.json()
        }).then(response => {
            if (response.status) {
                this.logIn(response.user);
            } else {
                this.logOut();
            }
        }).catch(error => {
            this.setState({ message: error.status, show: true })
            setTimeout(() => {
                this.setState({ message: '', show: false })
            }, 3000)
        })
    }

    render() {
        const {
            isLoggedIn,
            user,
            show,
            message
        } = this.state;

        if (isLoggedIn === null) {
            return (<div>Loading...</div>)
        }
        return (
            <UserContext.Provider value={{
                isLoggedIn,
                user,
                logIn: this.logIn,
                logOut: this.logOut
            }}> <Fragment>
                    {this.props.children}
                    <Notification show={show} message={message} />
                </Fragment>
            </UserContext.Provider>
        )
    }
}

export default App;