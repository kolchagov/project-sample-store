import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { UserContext } from '../../contexts/AuthContextProvider'

export default function PrivateGuard() {
    const { user } = useContext(UserContext)

    const isAuthenticated = () => {
        return !!user.accessToken
    }

    return (
        <>
            {
                isAuthenticated() ?
                    <Outlet /> :
                    <Navigate to="/login" />
            }
        </>
    )
}