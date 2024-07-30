import UserService from "./UserService"

class Requester {

    private static async doRequest(method: string, url: string, data?: object) {
        const headers = {
            'Content-Type': 'application/json',
        }

        const currentUser = UserService.currentUser
        if (currentUser && currentUser.accessToken) {
            if (UserService.isAdmin(currentUser) && url.indexOf('/users') > -1) {
                // special case: path /data/users is protected
                headers['X-Admin'] = 'true'
            }
            headers['X-Authorization'] = currentUser.accessToken
        }

        const options = {
            method,
            headers,
        }
        let body: string | undefined
        if (data) {
            body = JSON.stringify(data)
        }
        let response;
        try {
            response = await fetch(url, { ...options, body })
        } catch (err) {
            console.error(`Request failed: ${method}:${url} ${JSON.stringify(data)}`);
            throw err;
        }
        if (response.ok) {
            if (response.status !== 204) {
                return response.json()
            } else {
                return true
            }
        } else {
            const errResponse = await response.json()
            console.error("debug me", errResponse);
            throw new Error(errResponse.message)
        }
    }

    static async get(url: string, data?: object) {
        return Requester.doRequest("GET", url, data)
    }

    static async post(url: string, data?: object) {
        return Requester.doRequest("POST", url, data)
    }

    static async put(url: string, data?: object) {
        return Requester.doRequest("PUT", url, data)
    }

    static async del(url: string, data?: object) {
        return Requester.doRequest("DELETE", url, data)
    }
}

export default Requester;