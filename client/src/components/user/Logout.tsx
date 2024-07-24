import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import UserContext from '../../contexts/UserContext'
import Button from '../Button'

export default function Logout() {
    const { logout } = useContext(UserContext)
    const [isLoggedOut, setIsLoggedOut] = React.useState(false)

    async function logoutClickHandler() {
        await logout()
        setIsLoggedOut(true)
    }
    return (
        <>
            <div className="row my-2 d-flex justify-content-center">
                <div className="col-12 col-md-6">
                    <section className='alert alert-success' role='alert'>
                        {
                            !isLoggedOut ?
                                <>
                                    <h3>Logging out...</h3>
                                    <p className=''>Confirm log-out by pressing Logout button</p>
                                    <Button color='prominent' onClickHandler={logoutClickHandler}>Logout</Button>
                                </> :
                                <>
                                    <h3>Logout successful.</h3>
                                    <Link to='/' className='m-3 button btn-medium prominent'>Go to home page</Link>
                                </>
                        }
                    </section>
                </div>
            </div>
        </>
    )
}