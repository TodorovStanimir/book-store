const basicUrl = 'http://localhost:4000/api/user/'
const userService = {
    loginUser: async (email, password) => {
        const response = await fetch(`${basicUrl}login`, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        if (response.status !== 200) {
            // const error = {
            //     status: response.status,
            //     message: response.statusText
            // }
            throw response
        }
        const loggedUser = await response.json();
        return loggedUser;
    },
    createUser: async (newUser) => {
        const user = await fetch(`${basicUrl}register`, {
            method: "post",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...newUser })
        })
        const registeredUser = await user.json();
        return registeredUser;
    },
}

export default userService