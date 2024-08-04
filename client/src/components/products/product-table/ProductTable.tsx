import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ProductService from '../../../services/ProductService'
import useCategoryMap from '../../../hooks/useCategoryMap'

import Product from '../../../model/Product'
import Modal from '../../dialogs/Modal'
import ConfirmModal from '../../dialogs/ConfirmModal'
import Button from '../../Button'

export default function ProductTable() {
    const navigate = useNavigate()
    const { getCategoryName } = useCategoryMap()
    const [products, setProducts] = useState<Product[]>([])
    const productIdRef = useRef<null | string>(null)
    const [prompt, setPrompt] = useState(''),
        [errorMessage, setErrorMessage] = useState<null | string>(null)

    useEffect(() => {
        ProductService.getProducts().then(dbProducts => {
            setProducts(dbProducts)
        }).catch(error => {
            setErrorMessage(error.message)
        })
    }, [])

    const deleteBtnClickHandler = (productId: string, name: string) => {
        productIdRef.current = productId
        setPrompt(() => `Are you sure you want to remove product "${name}"?`)
    }

    const deleteProduct = async () => {
        // TODO
    }

    const cancelDeleteProduct = async () => {
        setPrompt(() => '')
        productIdRef.current = null
    }

    const getFormattedPrice = (product: Product) => {
        const price = ProductService.getFormattedPrice(product.price)
        return price.join(".")
    }

    return (
        <>
            {
                errorMessage &&
                <Modal title='Error' dismissModal={() => setErrorMessage(null)}>
                    {errorMessage}
                </Modal>
            }
            {prompt &&
                <ConfirmModal
                    title='Confirmation required'
                    confirmCallback={() => deleteProduct()}
                    cancelCallback={cancelDeleteProduct}
                >
                    {prompt}
                </ConfirmModal >}
            <div className="card m-2">
                <div className="card-text p-2">
                    <div className="row my-3">
                        <div className="col">
                            <h3>Catalog</h3>
                        </div>
                        <div className="col-auto text-right">
                            <Button
                                color='prominent'
                                onClickHandler={() => navigate("/create-product")}
                            >
                                Add product
                            </Button>
                        </div>
                    </div>
                    {products.length === 0 ?
                        <div className="alert alert-info">
                            No products found.
                        </div>
                        :
                        <table className="table table-responsive table-striped border">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Year</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th className='text-center'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map((prod, i) =>
                                        <tr key={i}>
                                            <td>{prod.make}</td>
                                            <td>{prod.year}</td>
                                            <td>{getCategoryName(prod.categoryId)}</td>
                                            <td className='text-end'>{getFormattedPrice(prod)}</td>
                                            <td className='d-flex flex-row justify-content-around'>
                                                <Button color='prominent'
                                                    onClickHandler={() => navigate(`/edit-product/${prod._id}`)}
                                                >
                                                    <i className="fa fa-pen"></i>
                                                </Button>
                                                <Button color='danger'
                                                    onClickHandler={() => prod._id &&
                                                        deleteBtnClickHandler(prod._id, `${prod.make} ${prod.model}`)}
                                                >
                                                    <i className="fa-regular fa-trash-can"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}