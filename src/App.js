import React, { Component, Fragment } from 'react';
import { UserContext, NotificationContext, LoaderContext } from './Context';
import getCookie from './utils/getCookie';
import userService from './services/user-service';
import Notification from './components/notification';
import Loader from './components/loader';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: null,
            user: null,
            message: '',
            show: false,
            showingLoader: false
        }
    }

    showLoader = () => {
        this.setState({
            showingLoader: true
        })
        setTimeout(() => {
            this.setState({
                showingLoader: false,
            })
        }, 1800)
    }

    showNotification = (message) => {
        this.setState({
            show: true,
            message
        })
    }

    hideNotification = () => {
        setTimeout(() => {
            this.setState({
                show: false,
                message: ''
            })
        }, 3000)
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
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
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
            message,
            showingLoader
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
            }}>
                <LoaderContext.Provider value={{
                    showingLoader,
                    showLoader: this.showLoader,
                }}>
                    <NotificationContext.Provider value={{
                        show,
                        message,
                        showNotification: this.showNotification,
                        hideNotification: this.hideNotification
                    }}>
                        <Fragment>
                            {this.props.children}
                            <Notification show={show} message={message} />
                            <Loader showingLoader={showingLoader} />
                        </Fragment>
                    </NotificationContext.Provider>
                </LoaderContext.Provider>
            </UserContext.Provider>
        )
    }
}

export default App;