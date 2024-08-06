import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import ProductService from '../../../services/ProductService'
import CommentsService, { CommentType } from '../../../services/CommentsService'

import CommentForm from '../comment-form/CommentForm'
import Product from '../../../model/Product'

export default function AddComment() {
    const { productId } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = React.useState({} as Product)

    useEffect(() => {
        if (!productId) return
        ProductService.getProduct(productId)
            .then(product => {
                setProduct(() => product)
            })
    }, [])

    const confirmAddCommentHandler = async (values: CommentType) => {
        await CommentsService.addComment(values)
        navigate(-1)
    }

    return (
        <>
            <div className="card m-2 p-3">
                <div className="card-text">
                    <h5>
                        Add comment about&nbsp;
                        <strong>
                            {product.make} {product.model}
                        </strong>
                    </h5>
                    {
                        !!productId &&
                        <CommentForm
                            productId={productId}
                            confirmHandler={confirmAddCommentHandler}
                            cancelHandler={() => navigate(-1)}
                        />
                    }
                </div>
            </div>
        </>
    )
}