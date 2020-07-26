import React from 'react';

const UserContext = React.createContext({
    isLoggedIn: false,
    user: null,
    logIn: () => { },
    logOut: () => { }
})

export default UserContext;