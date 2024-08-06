import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../../contexts/AuthContextProvider'

export default function LoggedUserGuard() {
    const { user } = useContext(UserContext)
    if (!!user.accessToken) {
        return <Navigate to={'/'} />
    }
    return (
        <>
            <Outlet />
        </>
    )
}