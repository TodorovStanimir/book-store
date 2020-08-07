import React, { Component, Fragment } from 'react';
import { UserContext, NotificationContext, LoaderContext } from './Context';
import getCookie from './utils/getCookie';
import userService from './services/user-service';
import Notification from './components/notification';
import Loader from './components/loader';
import axios from 'axios';

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
        axios('http://localhost:4000/api/user/verify', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
            }
        }).then(response => {
            if (response.data.status) {
                this.logIn(response.data.user);
            } else {
                this.logOut();
            }
        }).catch(error => {
            this.showNotification(error);
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
            return (<div><Notification show={show} message={message} /></div>)
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