import requester from "./requester";
import User from '../model/User';

const BASE = "http://localhost:3030/users"

class UserService {
    static currentUser: User

    static async getUser(userId: string): Promise<User> {
        const user = await requester.get(`${BASE}/${userId}`)
        return user
    }

    static async login({ email, password }): Promise<User> {
        const user = await requester.post(`${BASE}/login`, { email, password }) as User
        UserService.currentUser = user
        return user
    }
}

export default UserService;