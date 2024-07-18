import React, { useState } from 'react'
import Button from '../Button'
import { Navigate, redirect } from 'react-router-dom'
import UserService from '../../services/UserService';
import Modal from '../dialogs/Modal';

export default function Login() {
    const [isRegister, setIsRegister] = useState(false),
        [errorMessage, setErrorMessage] = useState('')

    function registerButtonClickHandler() {
        console.log("debug me");
        setIsRegister(true)
    }

    async function loginFormSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)

        try {
            await UserService.login({ email: data.email, password: data.password });
        } catch (err) {
            setErrorMessage("Invalid email or password")
            console.log(err);
        }
    }

    return (
        <>
            {isRegister && <Navigate to={'/register'} />}
            {
                errorMessage &&
                <Modal title='Error' dismissModal={() => setErrorMessage('')}>
                    <p>{errorMessage}</p>
                </Modal>
            }
            <form action="" className='m-3' onSubmit={loginFormSubmitHandler}>
                <div className="row justify-content-md-center">
                    <div className="card p-3 col-12 col-md-6 col-lg-5 col-xxl-4">
                        <div className="row">
                            <div className="col">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className="fa fa-envelope"></i>
                                    </span>
                                    <input
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        aria-label="Email"
                                        aria-describedby="basic-addon1"
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <i className="fa fa-key"></i>
                                    </span>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col d-flex justify-content-end">
                                <Button type='submit' className='mx-2'>Login</Button>
                                <Button type='button' color='default' onClickHandler={registerButtonClickHandler}>Register</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}