import requester from "./requester";
import User from '../model/User';

const BASE = "https://http://localhost:3030/users"

class UserService {
    static async getUser(userId: string): Promise<User> {
        const user = await requester.get(`${BASE}/${userId}`);
        return user;
    }

    static async login({ email, password }): Promise<User> {
        const user = await requester.post(`${BASE}/login`, { email, password }) as User;
        return user;
    }
}

export default UserService;