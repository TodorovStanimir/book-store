import React from 'react';

const UserContext = React.createContext({
    isLoggedIn: false,
    user: null,
    logIn: () => { },
    logOut: () => { }
})

const NotificationContext = React.createContext({
    show: false,
    message: null,
    showNotification: () => { },
})

const LoaderContext = React.createContext({
    showingLoader: false,
    showLoader: () => { },
})

const LanguageContext = React.createContext({
    language: 'en',
    changeLanguage: () => { },
})

export { UserContext, NotificationContext, LoaderContext, LanguageContext }