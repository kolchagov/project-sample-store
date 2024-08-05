import { useEffect, useState } from "react";

import User from "../model/User";
import UserService from "../services/UserService";

export default function useAccount() {
    const [user, setUser] = useState(new User());

    // tried useState(()=> ...) here, but it didn't work on vite hmr update
    useEffect(() => {
        const userJson = localStorage.getItem("user")
        if (userJson) {
            const loggedInUser = JSON.parse(userJson);
            UserService.setCurrentUser(loggedInUser)
            setUser(() => loggedInUser)
        }
    }, [])

    async function login(credentials: { email: string, password: string }) {
        const loggedUser = await UserService.login(credentials)
        switchAuth(loggedUser)
    }

    async function logout() {
        switchAuth(new User())
        UserService.logout();
    }

    function isAuthenticated(): boolean {
        return !!user.accessToken;
    }

    function switchAuth(newUser: User) {
        if (isAuthenticated()) {
            localStorage.removeItem("user")
        } else {
            localStorage.setItem("user", JSON.stringify(newUser))
        }
        console.log("debug me", newUser);
        setUser(() => newUser)
    }
    return { user, login, logout, switchAuth, isAuthenticated }


}
