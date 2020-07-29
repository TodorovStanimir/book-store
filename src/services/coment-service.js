const basicUrl = 'http://localhost:4000/api/comment/';

const commentService = async (method, url = '', data = '', token = '') => {

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
}

export default commentService