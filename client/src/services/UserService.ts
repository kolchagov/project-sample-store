import Requester from "./Requester";
import User from '../model/User';

const BASE = "http://localhost:3030/users",
    STORE_BASE = "http://localhost:3030/data"

class UserService {
    private static authUser: User | null

    static get currentUser(): User | null {
        return this.authUser
    }

    public static setCurrentUser(user: User | null) {
        this.authUser = user
    }

    static async getUser(userId: string | undefined): Promise<User> {
        const user = await Requester.doPowerRequest(
            "GET",
            { "X-Admin": "true" },
            `${STORE_BASE}/users/${userId}`
        )
        if (user === true) {
            // special case: server returns 204: no content
            return new User()
        }
        return user
    }

    static async getUsers(): Promise<User[]> {
        const storeObject = await Requester.get(`${STORE_BASE}/users`) as Object
        return Object.values(storeObject)
    }

    static async deleteUser(userId: string): Promise<User[]> {
        if (userId === this.authUser?._id) {
            throw new Error("Can't delete current user")
        }
        const storeObject = await Requester.del(`${STORE_BASE}/users/${userId}`) as Object
        return Object.values(storeObject)
    }

    static async updateUser({ _id, email, username, address, state, city, zip, subscribed }: User) {
        if (!_id) {
            throw new Error("User must have an id")
        }
        const adminOptions = _id === this.authUser?._id ? { "X-Admin": "true" } : {}
        const persistedUser = await Requester.doPowerRequest(
            "PUT",
            adminOptions,
            `${STORE_BASE}/users/${_id}`,
            { _id, email, username, address, state, city, zip, subscribed }
        ) as User
        if (_id === this.authUser?._id) {
            this.authUser = {
                ...this.authUser,
                ...persistedUser
            }
        }
        return persistedUser
    }

    static async register({ email, username, password, address, state, city, zip, subscribed }): Promise<User> {
        // server-specific user registration
        const user = await Requester.post(`${BASE}/register`, { email, username, password }) as User
        //add user data to our accounts collection (without password)
        const account = { _id: user._id, email, username, address, state, city, zip, subscribed };
        await Requester.doPowerRequest(
            "POST",
            {
                "X-Authorization": `${user.accessToken}`,
                "X-Admin": "true",  // users collection is protected
            },
            `${STORE_BASE}/users`,
            account)
        return account
    }

    static async login({ email, password }): Promise<User> {
        const user = await Requester.post(`${BASE}/login`, { email, password }) as User
        this.authUser = user
        try {
            // get user details from users collection
            const details = await UserService.getUser(user._id)
            Object.assign(user, details)
        } catch { }

        return user
    }

    static async logout() {
        this.authUser = null
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