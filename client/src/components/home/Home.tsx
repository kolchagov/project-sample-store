import React from 'react'

import ProductCard from '../products/product-card/ProductCard';
import useProducts from '../../hooks/useProducts';
import { useParams } from 'react-router-dom';

export default function Home() {
    const { categoryId } = useParams()
    const { products, setCategoryId } = useProducts()

    React.useEffect(() => {
        setCategoryId(categoryId)
    }, [categoryId])

    return (
        <div className='row'>
            {
                products.map((product, index) => (
                    <div className='col' key={index}>
                        <ProductCard product={product} />
                    </div>
                ))
            }
        </div>
    )
}