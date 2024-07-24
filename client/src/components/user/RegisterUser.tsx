import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import UserService from '../../services/UserService';
import UserForm from './UserForm';
import Modal from '../dialogs/Modal';

export default function RegisterUser() {
    const [userCreated, setUserCreated] = useState(false),
        navigate = useNavigate()

    async function registerUser(userData) {
        await UserService.register(userData)
        setUserCreated(() => true)
    }

    return (
        <>
            <UserForm submitCallback={registerUser} submitBtnText='Sign up' />
            {
                userCreated &&
                <>
                    <Modal title='Success' dismissModal={() => { navigate('/login') }} >
                        <h5>User registered successfully</h5>
                        <p>Please login to continue</p>
                    </Modal>
                </>
            }
        </>
    )
}