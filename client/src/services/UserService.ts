import requester from "./Requester";
import User from '../model/User';

const BASE = "http://localhost:3030/users",
    STORE_BASE = "http://localhost:3030/jsonstore"

class UserService {

    static async getUsers(userId: string): Promise<User> {
        const user = await requester.get(`${STORE_BASE}/${userId}`)
        return user
    }

    static async register({ email, username, password, address, state, city, zip, subscribed }): Promise<User> {
        const user = await requester.post(`${BASE}/register`, { email, username, password }) as User
        //add user data to jsonstore
        const account = { ...user, address, state, city, zip, subscribed };
        // cleanup sensitive data
        delete account.accessToken
        delete account.password
        await requester.post(`${STORE_BASE}/users`, account)
        return account
    }

    static async login({ email, password }): Promise<User> {
        const user = await requester.post(`${BASE}/login`, { email, password }) as User
        return user
    }

    static async logout() {
        await requester.post(`${BASE}/logout`)
    }

    static isAdmin(user: any) {
        return user.email?.startsWith('admin@abv.bg')
    }

    static isLogged(user: any) {
        return !!user.accessToken
    }
}

export default UserService;