import React, { useEffect } from 'react'
import UserService from '../../services/UserService'
import EventService from '../../services/EventService'
import { Link } from 'react-router-dom'

export default function Logout() {
    const [isLoggedOut, setIsLoggedOut] = React.useState(false)
    useEffect(() => {
        (async () => {
            await UserService.logout();
            setIsLoggedOut(true)
            EventService.publish('logout')
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