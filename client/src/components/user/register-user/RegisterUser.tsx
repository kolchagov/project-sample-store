import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import UserService from '../../../services/UserService';
import UserForm from '../UserForm';
import Modal from '../../dialogs/Modal';

export default function RegisterUser() {
    const [userCreated, setUserCreated] = useState(false),
        [error, setError] = useState(""),
        navigate = useNavigate()

    async function registerUser(userData) {
        try {
            await UserService.register(userData)
            setUserCreated(() => true)
        } catch (err) {
            setError(() => err.message)
        }
    }

    return (
        <>
            <UserForm isRegisterMode={true} submitCallback={registerUser} submitBtnText='Sign up' />
            {
                userCreated &&
                <>
                    <Modal title='Success' dismissModal={() => { navigate('/login') }} >
                        <h5>User registered successfully</h5>
                        <p>Please login to continue</p>
                    </Modal>
                </>
            }
            {
                error &&
                <Modal title='Error' dismissModal={() => setError('')}>
                    {error}
                </Modal>
            }
        </>
    )
}