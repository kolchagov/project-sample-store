import React, { useContext } from 'react'

import { UserContext } from '../../contexts/AuthContextProvider'
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext'

import './Checkout.css'

export default function CheckoutSuccess() {
    const { user } = useContext(UserContext)
    const [isLoading, setIsLoading] = React.useState(true)

    const { clearItems } = useContext(ShoppingCartContext)

    React.useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
            clearItems()
        }, 1500)
    }, [])

    return (
        <>
            <h3>
                {
                    isLoading ? "Checkout in progress..." : "Checkout complete."
                }
            </h3>
            <div className="row">
                <div className="col-md-6">
                    Order Details:
                </div>
                <div className="col-md-6">
                    <strong>{user.username}</strong>
                    <div>{user.state}, {user.zip}</div>
                    <div>{user.address}, {user.city}</div>
                </div>
            </div>
            <div className="row">
                <div className={
                    `col-12
                    d-flex
                    justify-content-center
                    align-items-center
                    vh33`
                }>
                    {
                        isLoading ?
                            <div className="spinner-border text-secondary " role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            :
                            <div className="alert alert-success" role="alert">
                                <p>Your order has been successfully placed.</p>
                                <p>Check your email for order confirmation.</p>
                                <p>
                                    <strong>Thank you for shopping with us!</strong>
                                </p>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}