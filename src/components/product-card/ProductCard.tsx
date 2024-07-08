import React, { useState } from "react";
import Product from "../../model/Product";
import "./ProductCard.css";
import ProductDetails from "../product-details/ProductDetails";
import Button from "../Button";

type ProductCardProps = {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const euros = Math.floor(product.price),
        cents = Math.floor(product.price % 1 * 100),
        [isShowDetails, setIsShowDetails] = useState(false);


    function handleBuyNowEvent() {
        console.log("debug me");
    }
    return (
        <>
            <div className="product-card">
                <div className='imgBox'>
                    <img src={product.image} alt={product.name} />
                </div>
                <div className='contentBox'>
                    <h3>{product.name}</h3>
                    <h2 className='price'>{euros}.<small>{cents}</small> €</h2>
                    <Button color='prominent' onClickHandler={handleBuyNowEvent}>Buy now</Button>
                    <a href="#" className='button buy warning' onClick={() => setIsShowDetails(true)}>More info</a>
                </div>
            </div >
            {isShowDetails && <ProductDetails product={product} dismissModal={() => setIsShowDetails(false)} />}
        </>
    )
}