import React, { useContext } from 'react'

import { UserContext } from '../../contexts/AuthContextProvider'
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext'
import ProductService from '../../services/ProductService'

import Button from '../Button'
import { useNavigate } from 'react-router-dom'

import './ShoppingCart.css'

export default function ShoppingCart() {
  const { user } = useContext(UserContext)
  const { items, totalPrice, itemAmount, setItems } = useContext(ShoppingCartContext)
  const navigate = useNavigate()

  const getFormattedPrice = (price: number) => {
    const priceArr = ProductService.getFormattedPrice(price)
    return priceArr.join(".")
  }

  const checkoutBtnHandler = () => {
    navigate('/checkout')
  }

  const registerBtnHandler = () => {
    navigate('/register-user')
  }

  const changeQuantityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, id } = e.target
    if (id) {
      const item = items.find(item => item._id === id)
      if (item) {
        item.count = Number(value)
      }
      setItems([...items])
    }
  }

  return (
    <>
      <div className="card my-2 p-3">
        <div className="card-text">
          <h3>Your cart</h3>
          {
            !items.length ?
              <div className="alert alert-danger">
                <h5>Cart is empty.</h5>
                <p>Please add some products to your cart.</p>
              </div> :
              <>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Unit price</th>
                      <th className='w-5em'>Quantity</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item._id}>
                        <td>{item.make} {item.model}</td>
                        <td>{getFormattedPrice(item.price)}</td>
                        <td className=''>
                          <input
                            type="number"
                            className='form-control'
                            min={0}
                            name="count"
                            id={item._id}
                            defaultValue={item.count}
                            onChange={changeQuantityHandler}
                            aria-label='count'
                          />
                        </td>
                        <td className='text-end'>
                          {getFormattedPrice(itemAmount(item))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3}>Total</td>
                      <td className='text-end'>
                        {getFormattedPrice(totalPrice)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <div className="row">
                  <div className="col-12 d-flex align-items-center">
                    {
                      !!user.email ?
                        <Button
                          color='prominent'
                          onClickHandler={checkoutBtnHandler}
                        >
                          Checkout
                        </Button> :
                        <>
                          <span>
                            Before proceeding to checkout, you need to login from menu
                            or register as new user here:
                          </span>
                          <Button
                            color='default'
                            className='outline m-2'
                            onClickHandler={registerBtnHandler}
                          >
                            Register
                          </Button>
                        </>
                    }
                  </div>
                </div>
              </>
          }

        </div>
      </div>
    </>
  )
}