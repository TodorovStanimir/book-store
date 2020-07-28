const basicUrl = 'http://localhost:4000/api/book/';

const bookService = async (method, url = '', data = '', token = '') => {

    const promise = (data || token)
        ? await fetch(`${basicUrl}${url}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
            },
            body: JSON.stringify({ data })
        })
        : await fetch(`${basicUrl}${url}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    console.log(promise)
    return promise
}

export default bookService