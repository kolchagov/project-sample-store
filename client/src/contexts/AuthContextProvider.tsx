import React from 'react'
import UserContext from './UserContext'
import useAccount from '../hooks/useAccount'

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const { user, login, logout } = useAccount()

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}