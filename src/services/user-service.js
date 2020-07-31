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
    
    getUser: async (method, url = '', data = '', token = '') => {
        const promise = (data || token)
            ? await fetch(`${basicUrl}${url}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${token}`
                },
                body: JSON.stringify({ ...data })
            })
            : await fetch(`${basicUrl}${url}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        return promise
    },
    logoutUser: async (token) => {
        const promise = await fetch(`${basicUrl}logout`, {
            method: "POST",
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
            },
        })
        if (promise.status !== 200) {
            throw promise
        }
        const result = await promise.json();
        return result;
    }
}

export default userService