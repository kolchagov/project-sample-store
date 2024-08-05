import React, { createContext } from 'react';

import Product from '../model/Product';
import CartItem from '../model/CartItem';

import useCart from '../hooks/useCart';

export const ShoppingCartContext = createContext({
    items: [] as CartItem[],
    addCartItem: (product: Product, count: number) => { },
    setItems: (items: CartItem[]) => { },
    getCartItemCount: (product: Product) => 0 as number,
    getAllItemsCount: () => 0 as number,
    totalPrice: 0 as number,
    itemAmount: (item: CartItem) => 0 as number,
    clearItems: () => { },
})

export function ShoppingCartContextProvider({ children }: { children: React.ReactNode }) {
    const {
        items,
        addCartItem,
        setItems,
        getCartItemCount,
        getAllItemsCount,
        totalPrice,
        itemAmount,
        clearItems,
    } = useCart()
    return (
        <ShoppingCartContext.Provider value={
            {
                items,
                addCartItem,
                setItems,
                getCartItemCount,
                getAllItemsCount,
                totalPrice,
                itemAmount,
                clearItems,
            }
        }>
            {children}
        </ShoppingCartContext.Provider>
    )
}