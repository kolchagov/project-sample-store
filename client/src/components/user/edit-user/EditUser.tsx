import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { UserContext } from '../../../contexts/AuthContextProvider';
import UserService from '../../../services/UserService'

import UserForm from '../UserForm'
import User from '../../../model/User';
import Modal from '../../dialogs/Modal';

export default function EditUser() {
    const { userId } = useParams(),
        navigate = useNavigate(),
        [user, setUser] = useState({} as User)
    const [errorMessage, setErrorMessage] = useState('')
    const { user: authUser, switchAuth } = useContext(UserContext)

    useEffect(() => {
        UserService.getUser(userId).then(currentUser => {
            setUser(() => currentUser)
        }).catch(error => {
            setErrorMessage(error.message)
        })
    }, [])

    const submitHandler = (values: User) => {
        UserService.updateUser(values).then(updatedUser => {
            setUser(() => updatedUser)
            // special case: update logged user
            if (updatedUser._id === authUser._id) {
                switchAuth({ ...updatedUser, accessToken: authUser.accessToken })
            }
            UserService.isAdmin(authUser) ?
                navigate('/users') : navigate('/')
        }).catch(error => {
            setErrorMessage(error.message)
        })
    }

    return (
        <>
            {
                errorMessage &&
                <Modal title='Error' dismissModal={() => setErrorMessage('')}>
                    <p>{errorMessage}</p>
                </Modal>
            }
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