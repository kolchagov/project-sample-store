import React from 'react'

import useAccount from '../hooks/useAccount'
import User from '../model/User'

export const UserContext = React.createContext({
    user: {} as User,
    login: async (credentials: { email: string, password: string }) => { },
    logout: async () => { },
})

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const { user, login, logout } = useAccount()

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}