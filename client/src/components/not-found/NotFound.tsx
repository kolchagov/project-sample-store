import React from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../Button'

export default function NotFound() {
    const navigate = useNavigate()

    const navigateHomeHandler = () => {
        navigate('/')
    }

    return (
        <>
            <div className="card m-2 p-3 d-flex justify-content-center">
                <div className="card-title">
                    <h3 className='text-center default m-4 py-2'>
                        Page not found
                    </h3>
                </div>
                <div className="card-text">
                    <p className='text-center '>
                        What's really strange is that we couldn't find
                        &nbsp;<strong>404 page</strong> either...
                    </p>
                    <p className='text-center'>
                        But you can go back to the home page.
                    </p>
                    <div className="row div col-auto m-4">
                        <Button
                            color='prominent'
                            onClickHandler={navigateHomeHandler}
                        >
                            Take me home
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}