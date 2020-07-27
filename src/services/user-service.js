const basicUrl = 'http://localhost:4000/api/user/'
const userService = {
    authenticate: async (url, data) => {
        const promise = await fetch(`${basicUrl}${url}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...data })
        })
        const token = promise.headers.get('Authorization');
        const result = await promise.json();

        if (result.username && token) {
            document.cookie = `x-auth-token=${token}`
        }

        if (result.errors) {
            throw result.errors;
        }
        return result;
    },
    // createUser: async (newUser) => {
    //     const response = await fetch(`${basicUrl}register`, {
    //         method: "post",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ ...newUser })
    //     })
    //     const token = response.headers.get('Authorization');
    //     const registeredUser = await response.json();

    //     if (registeredUser.username && token) {
    //         document.cookie = `x-auth-token=${token}`
    //     }

    //     if (registeredUser.errors) {
    //         throw registeredUser.errors;
    //     }
    //     return registeredUser;
    // },
    getUser: async (userId) => {
        try {
            const rawUsers = await fetch(basicUrl);
            const users = await rawUsers.json();
            const user = users.find(user => user._id === userId)
            return user;
        } catch (error) {
            console.log(error)
        }
    },
    logoutUser: async (token) => {
        const promise = await fetch(`${basicUrl}logout`, {
            method: "POST",
            'headers': {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({token})
        })
        if (promise.status !== 200) {
            throw promise
        }
        const result = await promise.json();
        return result;
    }
}

export default userService