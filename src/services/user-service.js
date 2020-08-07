import axios from 'axios';
const basicUrl = 'http://localhost:4000/api/user/'
const userService = {
    authenticate: async (url, data) => {
        try {
            const promise = await axios({
                url: `${basicUrl}${url}`,
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { ...data }
            })
            const result = promise.data;
            const token = promise.headers.authorization;

            if (result.username && token) {
                document.cookie = `x-auth-token=${token}`
            }

            if (result.errors) {
                throw result.errors;
            }
            return result;
        } catch (error) {
            return error
        }

    },

    getUser: async (method, url = '', data = '', token = '') => {
        try {
            const promise = (data || token)
                ? await axios({
                    url: `${basicUrl}${url}`,
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `token ${token}`
                    },
                    data: { ...data }
                })
                : await axios({
                    url: `${basicUrl}${url}`,
                    method: method,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            const result = promise.data;
            if (result.errors) {
                throw result.errors;
            }
            return result;
        } catch (error) {
            return error;
        }
    },
    logoutUser: async (token) => {
        try {
            const promise = await axios({
                url:`${basicUrl}logout`, 
                method: 'post',
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${token}`
                },
            })
            if (promise.status !== 200) {
                throw promise
            }
            const result = await promise.data;
            return result;
        } catch (error) {
            console.log(error)
        }
    }
}

export default userService