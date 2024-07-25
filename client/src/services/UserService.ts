import Requester from "./Requester";
import User from '../model/User';

const BASE = "http://localhost:3030/users",
    STORE_BASE = "http://localhost:3030/jsonstore"

class UserService {
    public static loggedinUser: User

    static async getUser(userId: string | undefined): Promise<User> {
        if (this.loggedinUser?._id === userId) {
            return this.loggedinUser
        }
        const user = await Requester.get(`${STORE_BASE}/users/${userId}`)
        return user
    }

    static async getUsers(): Promise<User[]> {
        const storeObject = await Requester.get(`${STORE_BASE}/users/`) as Object
        return Object.values(storeObject)
    }

    static async deleteUser(userId: string): Promise<User[]> {
        const storeObject = await Requester.del(`${STORE_BASE}/users/${userId}`) as Object
        return Object.values(storeObject)
    }

    static async register({ email, username, password, address, state, city, zip, subscribed }): Promise<User> {
        const user = await Requester.post(`${BASE}/register`, { email, username, password }) as User
        //add user data to jsonstore
        const account = { ...user, address, state, city, zip, subscribed };
        // cleanup sensitive data
        delete account.accessToken
        delete account.password
        await Requester.post(`${STORE_BASE}/users`, account)
        return account
    }

    static async login({ email, password }): Promise<User> {
        const user = await Requester.post(`${BASE}/login`, { email, password }) as User
        this.loggedinUser = user
        return user
    }

    static async logout() {
        await Requester.post(`${BASE}/logout`)
    }

    static isAdmin(user: any) {
        return user.email && user.email.startsWith('admin@abv.bg')
    }

    static isLogged(user: any) {
        return !!user.accessToken
    }
}

export default UserService;