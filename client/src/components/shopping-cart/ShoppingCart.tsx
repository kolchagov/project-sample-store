import React, { useContext } from 'react'

import { ShoppingCartContext } from '../../contexts/ShoppingCartContext'
import ProductService from '../../services/ProductService'

import Button from '../Button'

export default function ShoppingCart() {
  const { items, totalPrice, itemAmount } = useContext(ShoppingCartContext)


  const getFormattedPrice = (price: number) => {
    const priceArr = ProductService.getFormattedPrice(price)
    return priceArr.join(".")
  }

  return (
    <>
      <div className="card my-2 p-3">
        <div className="card-text">
          <h3>Your cart</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product</th>
                <th>Unit price</th>
                <th>Quantity</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item.make} {item.model}</td>
                  <td>{getFormattedPrice(item.price)}</td>
                  <td>{item.count}</td>
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
            <div className="col-12">
              <Button color='prominent' onClickHandler={() => { }}>
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}