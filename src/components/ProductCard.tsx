import React from "react";
import Product from "../model/Product";
import Button from './Button';
import InputGroup from "./InputGroup";
import Icon from "./Icon";
import "./ProductCard.css";

type ProductCardProps = {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const euros = Math.floor(product.price),
        cents = Math.floor(product.price % 1 * 100)
    return (
        <>
            <div className="product-card">
                <div className='imgBox'>
                    <img src={product.image} alt={product.name} />
                </div>
                <div className='contentBox'>
                    <h3>{product.name}</h3>
                    <h2 className='price'>{euros}.<small>{cents}</small> €</h2>
                    <a href="#" className="buy prominent">Buy Now</a>
                    <a href="#" className='buy'>More info</a>
                </div>
                {/* 
                <h3>{product.name}</h3>
                <div className="product-description">{product.description}</div><div className="flex-group">
                    <div>
                        <span className='price'>{product.price.toFixed(2)}</span>
                    </div>
                    <div className="product-quantity">
                        <InputGroup
                            prependElement={Button({ children: Icon({ names: ["solid", "minus"] }), color: "default" })}
                            appendElement={Button({ children: Icon({ names: ["solid", "plus"] }), color: "default" })}
                        >
                            <input type='text' placeholder='0' />
                        </InputGroup>
                    </div>
                    <Button color='prominent'>Add to cart</Button>
                </div> */}
            </div >
        </>
    )
}