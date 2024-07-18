async function requester(method: string, url: string, data?: object) {
    const headers = {
        'Content-Type': 'application/json',
    }
    let body: string | undefined = undefined
    const options = {
        method,
        headers,
        body,
    }
    if (data) {
        body = JSON.stringify(data)
    }
    const response = await fetch(url, options)
    if (response.ok) {
        return response.json()
    } else {
        throw new Error(response.statusText)
    }
}

const get = requester.bind(null, 'GET')
const post = requester.bind(null, 'POST')
const put = requester.bind(null, 'PUT')
const del = requester.bind(null, 'DELETE')

export default {
    get,
    post,
    put,
    del,
}