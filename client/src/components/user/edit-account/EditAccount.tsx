import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { UserContext } from '../../../contexts/AuthContextProvider'

export default function EditAccount() {
    const { user } = useContext(UserContext)

    return (
        <>
            <Navigate to={`/edit-user/${user._id}`} />
        </>
    )
}