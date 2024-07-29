import { useEffect, useState } from "react";

import User from "../model/User";
import UserService from "../services/UserService";

export default function useAccount() {
    const [user, setUser] = useState(() => {
        const userJson = localStorage.getItem("user")
        if (userJson) {
            const loggedInUser = JSON.parse(userJson);
            // console.log("debug me", loggedInUser);
            UserService.setCurrentUser(loggedInUser)
            return loggedInUser
        } else {
            return new User()
        }
    });

    async function login(credentials: { email: string, password: string }) {
        const loggedUser = await UserService.login(credentials)
        switchAuth(loggedUser)
    }

    async function logout() {
        await UserService.logout();
        switchAuth(new User())
    }

    function isAuthenticated() {
        return !!user.accessToken;
    }

    function switchAuth(newUser: User) {
        if (isAuthenticated()) {
            localStorage.removeItem("user")
        } else {
            localStorage.setItem("user", JSON.stringify(newUser))
        }
        setUser(() => user)
    }
    return { user, login, logout, switchAuth, isAuthenticated }


}
