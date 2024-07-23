import React, { useContext, useEffect } from 'react'
import UserService from '../../services/UserService'
import EventService from '../../services/EventService'
import { Link } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'

export default function Logout() {
    const { logout } = useContext(UserContext)
    const [isLoggedOut, setIsLoggedOut] = React.useState(false)
    useEffect(() => {
        (async () => {
            await logout()
            setIsLoggedOut(true)
        })()
    }, [])
    return (
        <>
            <div className="row m-2">
                <section className='alert alert-success' role='alert'>
                    {
                        !isLoggedOut ?
                            <h3>Logging out...</h3> :
                            <>
                                <h3>Logout successful.</h3>
                                <Link to='/' className='m-3 button btn-medium prominent'>Go to home page</Link>
                            </>
                    }
                </section>
            </div>
        </>
    )
}