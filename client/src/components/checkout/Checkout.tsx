import React, { useContext } from 'react'

import { ShoppingCartContext } from '../../contexts/ShoppingCartContext'

import { UserContext } from '../../contexts/AuthContextProvider'
import CheckoutSuccess from './CheckoutSuccess'

export default function Checkout() {
    const { user } = useContext(UserContext)

    return (
        <>
            <div className="card my-2 p-3">
                <div className="card-text">
                    {
                        !user.address ?
                            <>
                                <div className="alert alert-warning">
                                    <h5>Please provide your delivery address.</h5>
                                    <p>Please use 'ACCOUNT' from main menu and edit your address.</p>
                                </div>
                            </>
                            :
                            <CheckoutSuccess />

                    }
                </div>
            </div>
        </>
    )
}