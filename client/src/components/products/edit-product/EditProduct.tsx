import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import ProductService from '../../../services/ProductService'

import Product from '../../../model/Product'
import ProductForm from '../product-form/ProductForm'
import Modal from '../../dialogs/Modal'

export default function EditProduct() {
    const navigate = useNavigate()
    const { productId } = useParams()
    const [product, setProduct] = useState<Product>({} as Product)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (productId) {
            ProductService.getProduct(productId).then(product => {
                setProduct(() => product)
            }).catch(error => {
                setErrorMessage(error.message)
            })
        }
    }, [productId])

    const saveProduct = (product: Product) => {
        ProductService.updateProduct(productId as string, product).then(() => {
            navigate("/catalog")
        }).catch(error => {
            setErrorMessage(error.message)
        })
    }

    return (
        <>
            {
                errorMessage &&
                <Modal title='Error' dismissModal={() => setErrorMessage('')}>
                    <p>{errorMessage}</p>
                </Modal>
            }
            <div className="card my-2">
                <div className="card-text p-3">
                    <h3>Edit product <strong>{product.make}</strong></h3>
                    <ProductForm product={product} submitCallback={saveProduct} />
                </div>
            </div>
        </>
    )
}