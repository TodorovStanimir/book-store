import axios from 'axios';
const basicUrl = {
    user: '/api/user/',
    book: '/api/book/',
    comment: '/api/comment/',
    message: '/api/message/'
};
const dataService = async ({ method, pageNumber = '', perPage = '', collectionUrl, url = '', data = '', token = '' }) => {
    try {
        const promise = (data || token)
            ? await axios({
                url: `${basicUrl[collectionUrl]}${url}`,
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${token}`
                },
                data: { ...data }
            })
            : await axios({
                url: `${basicUrl[collectionUrl]}${url}?page=${pageNumber}&perPage=${perPage}`,
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        const result = promise.data;

        if (result.errors) {
            throw result.errors;
        }

        if ((url === 'login' || url === 'register') &&
            result.username && promise.headers.authorization) {
            document.cookie = `x-auth-token=${promise.headers.authorization}`
        }
        return result;
    } catch (error) {
        return error;
    }
}

export default dataService