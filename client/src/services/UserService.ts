import requester from "./Requester";
import User from '../model/User';

const BASE = "http://localhost:3030/users"

class UserService {

    static async getUser(userId: string): Promise<User> {
        const user = await requester.get(`${BASE}/${userId}`)
        return user
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