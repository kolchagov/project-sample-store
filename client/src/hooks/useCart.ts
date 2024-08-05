import { useState } from "react"
import CartItem from "../model/CartItem"
import Product from "../model/Product"

export default function useCart() {
    const [items, setItems] = useState<CartItem[]>([])

    const addCartItem = (product: Product, count: number) => {
        setItems(prev => {
            const existingItem = prev.find(item => item._id === product._id)
            if (existingItem) {
                console.log("debug me add existing");

                existingItem.count += count
                return [...prev]
            }
            return [...prev, new CartItem(product, count)]
        })
    }

    const getCartItemCount = (product: Product): number => {
        const item = items.find(item => item._id === product._id)
        return item ? item.count : 0
    }

    const getAllItemsCount = () => {
        return items.reduce((acc, item) => acc + item.count, 0)
    }

    const totalPrice = items.reduce((acc, product) => acc + product.price * product.count, 0)

    const itemAmount = (item: CartItem) => item.price * item.count

    const clearItems = () => setItems([])
    return {
        items,
        addCartItem,
        setItems,
        getCartItemCount,
        getAllItemsCount,
        totalPrice,
        itemAmount,
        clearItems,
    }
}