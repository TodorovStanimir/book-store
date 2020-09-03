import React, { Component, Fragment } from 'react';
import { UserContext, NotificationContext, LoaderContext, LanguageContext } from './Context';
import dataService from './services/data-service';
import Notification from './components/notification';
import Loader from './components/loader';
import axios from 'axios';
import en from './languages/en';
import bg from './languages/bg';

const languages = { en, bg };

let defaultLanguage = localStorage.getItem('language') ? localStorage.getItem('language') : 'bg';

window.i18nData = languages[defaultLanguage];

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: null,
            user: null,
            message: '',
            show: false,
            showingLoader: false,
            language: defaultLanguage
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

    logOut = async (message = null) => {

        try {
            const result = await dataService({ method: 'post', collectionUrl: 'user', url: 'logout' });

            if (result.msg && this.state.isLoggedIn && message !== 'noNotification')
                this.showNotification(result.msg)

            this.setState({
                isLoggedIn: false,
                user: null
            })
        } catch (error) {
            this.showNotification(error.status)
        }
    }

    changeLanguage = (e) => {
        window.i18nData = languages[e.target.dataset.language];
        this.setState({
            language: e.target.dataset.language
        })
        localStorage.setItem('language', e.target.dataset.language);
    }

    componentDidMount() {

        axios('/api/user/verify', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
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
            showingLoader,
            language
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
                        <LanguageContext.Provider value={{
                            language,
                            changeLanguage: this.changeLanguage
                        }}>
                            <Fragment>
                                {this.props.children}
                                <Notification show={show} message={message} />
                                <Loader showingLoader={showingLoader} />
                            </Fragment>
                        </LanguageContext.Provider>
                    </NotificationContext.Provider>
                </LoaderContext.Provider>
            </UserContext.Provider>
        )
    }
}

export default App;