async function requester(method: string, url: string, data?: object) {
    const headers = {
        'Content-Type': 'application/json',
    }
    const options = {
        method,
        headers,
    }
    let body: string | undefined
    if (data) {
        body = JSON.stringify(data)
    }
    const response = await fetch(url, { ...options, body })
    if (response.ok) {
        if (response.status !== 204) {
            return response.json()
        } else {
            return true
        }
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