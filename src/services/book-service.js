const basicUrl = 'http://localhost:4000/api/book/';

const bookService = async (method, url='', data='', token='') => {

    const promise = (data || token)
        ? await fetch(`${basicUrl}${url}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: data ? JSON.stringify({ data, token }) : JSON.stringify({ token })
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