import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductService from "../services/ProductService";
import Product from "../model/Product";

export default function useProducts() {
    const [products, setProducts] = useState(Array<Product>())

    useEffect(() => {
        ProductService.getProducts().then(catalog =>
            setProducts(() => catalog)
        )
    }, [])

    const setCategoryId = (categoryId: string | undefined) => {
        ProductService.getProducts(categoryId).then(catalog => {
            console.log("debug me: ", catalog);
            setProducts(() => catalog)
        })
    }

    const clearAll = () => {
        setProducts(() => [])
    }

    return { products, setCategoryId, setProducts, clearAll }
}
