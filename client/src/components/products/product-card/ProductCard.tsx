import React, { useState } from "react";

import Product from "../../../model/Product";
import ProductDetails from "../product-details/ProductDetails";

import Button from "../../Button";

import "./ProductCard.css";

type ProductCardProps = {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const euros = Math.floor(product.price),
        cents = ("00" + Math.round(product.price % 1 * 100)).slice(-2),
        [isShowDetails, setIsShowDetails] = useState(false);
    let title = `${product.make} ${product.model}`

    if (title.length > 40) {
        title = title.substring(0, 40) + '...';
    }

    function handleBuyNowEvent() {
        console.log("debug me TODO implement buy");
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
                    <Button color='prominent' onClickHandler={handleBuyNowEvent}>Buy now</Button>
                    <a href="#" className='button buy warning' onClick={() => setIsShowDetails(true)}>More info</a>
                </div>
            </div >
            {isShowDetails && <ProductDetails product={product} dismissModal={() => setIsShowDetails(false)} />}
        </>
    )
}