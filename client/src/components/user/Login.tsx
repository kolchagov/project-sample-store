import React, { useState } from 'react'
import Button from '../Button'
import { Navigate, redirect } from 'react-router-dom'

export default function Login() {
    const [isRegister, setIsRegister] = useState(false)
    function registerButtonClickHandler() {
        console.log("debug me");
        setIsRegister(true)
    }
    return (
        <>
            {isRegister && <Navigate to={'/register'} />}
            <form action="" className='m-3'>
                <div className="row justify-content-md-center">
                    <div className="card p-3 col-12 col-md-6 col-lg-5">
                        <div className="row">
                            <div className="col">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className="fa fa-envelope"></i>
                                    </span>
                                    <input
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