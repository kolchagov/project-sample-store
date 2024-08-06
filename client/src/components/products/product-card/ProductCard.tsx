import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ShoppingCartContext } from "../../../contexts/ShoppingCartContext";

import ProductService from '../../../services/ProductService';
import Product from "../../../model/Product";
import ProductDetails from "../product-details/ProductDetails";

import Button from "../../Button";
import ProductCountBadge from "./ProductCountBadge";

import "./ProductCard.css";
import { UserContext } from "../../../contexts/AuthContextProvider";
import Comments from "../../comments/Comments";

type ProductCardProps = {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const { user } = useContext(UserContext)
    const { addCartItem } = useContext(ShoppingCartContext)
    const [euros, cents] = ProductService.getFormattedPrice(product.price),
        [isShowDetails, setIsShowDetails] = useState(false),
        [isShowComments, setIsShowComments] = useState(false)

    let title = `${product.make} ${product.model}`

    if (title.length > 40) {
        title = title.substring(0, 40) + '...';
    }

    function addComment() {

    }

    function addToCartClickHandler() {
        addCartItem(product, 1)
    }
    return (
        <>
            <div className="product-card my-2">
                <div className='imgBox'>
                    <img src={product.img} alt={product.model} />
                </div>
                <div className='contentBox'>
                    <h3 className="stroke">{title}</h3>
                    <h2 className='price'>{euros}.<small>{cents}</small> €</h2>
                    <div className="d-flex">
                        <Button
                            color='prominent'
                            className="position-relative mx-2"
                            onClickHandler={() => addToCartClickHandler()}
                        >
                            Add to cart <ProductCountBadge product={product} />
                        </Button>
                        <Button color='warning' onClickHandler={() => setIsShowComments(true)}>
                            Comments
                        </Button>
                    </div>
                    <Link
                        to="#"
                        className='button buy warning'
                        onClick={() => setIsShowDetails(true)}
                    >
                        More info
                    </Link>

                </div>
            </div >
            {
                isShowDetails &&
                <ProductDetails
                    product={product}
                    dismissModal={() => setIsShowDetails(false)}
                />
            }
            {
                isShowComments && <Navigate to={`/comments/${product._id}`} />
            }
        </>
    )
}