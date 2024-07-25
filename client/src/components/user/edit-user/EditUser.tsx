import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import UserService from '../../../services/UserService'

import UserForm from '../UserForm'
import User from '../../../model/User';

export default function EditUser() {
    const { userId } = useParams(),
        [user, setUser] = useState({} as User)
    useEffect(() => {
        UserService.getUser(userId).then(currentUser => {
            setUser(() => currentUser)
        })
    }, [])

    function submitHandler(values: User) {
        console.log(values);
    }
    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="card my-2">
                        <div className="card-text p-2">
                            <h3>Edit user <strong>{user.username}</strong></h3>
                            <UserForm user={user} isRegisterMode={false} submitCallback={submitHandler} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}