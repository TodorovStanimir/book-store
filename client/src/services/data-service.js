import axios from 'axios';
const basicUrl = {
    user: '/api/user/',
    book: '/api/book/',
    comment: '/api/comment/',
    message: '/api/message/'
};
const dataService = async ({ method, pageNumber = '', perPage = '', collectionUrl, url = '', data = '' }) => {
    try {
        const promise = data
            ? await axios({
                url: `${basicUrl[collectionUrl]}${url}`,
                method: method,
                headers: {
                    'Content-Type': 'application/json'
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

        return result;
    } catch (error) {
        return error;
    }
}

export default dataService