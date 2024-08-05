import UserService from "./UserService"

class Requester {

    private static doRequest(method: string, url: string, data?: object) {
        return this.doRequestWithOptions(method, {}, url, data)
    }

    static doPowerRequest(method: string, options: {}, url: string, data?: object) {
        return this.doRequestWithOptions(method, options, url, data)
    }

    private static async doRequestWithOptions(
        method: string,
        options: object,
        url: string,
        data?: object
    ) {
        const headers = {
            'Content-Type': 'application/json',
        }

        const currentUser = UserService.currentUser
        if (currentUser && currentUser.accessToken) {
            if (UserService.isAdmin(currentUser) && url.indexOf('/users') > -1) {
                // special case: path /data/users is protected
                headers['X-Admin'] = 'true'
                // } else if (url.endsWith('/edit-user/' + UserService.currentUser?._id)) {
                //     // special case: access own account
                //     headers['X-Admin'] = 'true'
            }
            headers['X-Authorization'] = currentUser.accessToken
        }


        let body: string | undefined
        if (data) {
            body = JSON.stringify(data)
        }
        let response;
        try {
            response = await fetch(url, { method, headers: { ...headers, ...options }, body })
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
            console.error("debug me", { ...headers, ...options, body }, errResponse);
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