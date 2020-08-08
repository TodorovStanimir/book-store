import axios from "axios";

const basicUrl = '/api/book/';

const bookService = async (method, url = '', data = '', token = '') => {
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

}

export default bookService