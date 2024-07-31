import React, { useEffect, useState } from 'react'
import ProductCard from '../products/product-card/ProductCard';
import ProductService from '../../services/ProductService';
import Product from '../../model/Product';

export default function Home() {
    const [products, setProducts] = useState(Array<Product>())
    useEffect(() => {
        (async () => {
            const catalog = await ProductService.getProducts();
            setProducts(() => catalog)
        })()
    }, [])

    return (
        <div className='row'>
            {
                products.map((product, index) => (
                    <div className='col' key={index}>
                        <ProductCard product={product} />
                    </div>
                ))
            }
            {/* <div className='col col-lg-3'>
                <Button color='prominent'>Test </Button>
                <Button color='warning'>Test </Button>
            </div>
            <div className='col col-lg-3'>
                <Button color='prominent' outline='1'>Test outlined</Button>
                <Button color='info' outline='1'>Test outlined</Button>
                <Button color='danger' outline='1'>Test outlined</Button>
                <Button color='success' outline='1'>Test outlined</Button>
            </div> */}
        </div>
    )
}