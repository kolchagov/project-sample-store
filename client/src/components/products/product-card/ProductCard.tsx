import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../../../contexts/ShoppingCartContext";

import ProductService from '../../../services/ProductService';
import Product from "../../../model/Product";
import ProductDetails from "../product-details/ProductDetails";

import Button from "../../Button";
import ProductCountBadge from "./ProductCountBadge";

import "./ProductCard.css";

type ProductCardProps = {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addCartItem } = useContext(ShoppingCartContext)
    const [euros, cents] = ProductService.getFormattedPrice(product.price),
        [isShowDetails, setIsShowDetails] = useState(false);

    let title = `${product.make} ${product.model}`

    if (title.length > 40) {
        title = title.substring(0, 40) + '...';
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
                    <Button
                        color='prominent'
                        className="position-relative"
                        onClickHandler={() => addToCartClickHandler()}
                    >
                        Add to cart <ProductCountBadge product={product} />
                    </Button>
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
        </>
    )
}