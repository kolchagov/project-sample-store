import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import UserService from '../../services/UserService'
import { UserContext } from '../../contexts/AuthContextProvider'


export default function AdminGuard() {
    const { user } = useContext(UserContext)

    return (
        <>
            {
                UserService.isAdmin(user) ?
                    <Outlet /> :
                    <Navigate to="/login" />
            }
        </>
    )
}