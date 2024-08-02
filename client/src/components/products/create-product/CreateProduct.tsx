import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import ProductService from '../../../services/ProductService'

import Product from '../../../model/Product'
import ProductForm from '../product-form/ProductForm'
import Modal from '../../dialogs/Modal'

export default function CreateProduct() {
    const navigate = useNavigate()
    const product = {
        name: "",
        price: 0,
        categoryId: "default",
        details: "",
        description: "",
        img: "",
        make: "",
        model: "",
        material: "",
        year: new Date().getFullYear(),
    } as Product
    const [errorMessage, setErrorMessage] = useState('')


    const crateProduct = (product: Product) => {
        ProductService.createProduct(product).then(() => {
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
                    <ProductForm product={product} submitCallback={crateProduct} />
                </div>
            </div>
        </>
    )
}