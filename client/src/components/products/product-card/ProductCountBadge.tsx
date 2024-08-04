import React, { useContext } from 'react'
import Product from '../../../model/Product';
import { ShoppingCartContext } from '../../../contexts/ShoppingCartContext';
import Badge from '../../common/Badge';

export default function ProductCountBadge({ product }: { product: Product }) {
    const { getCartItemCount } = useContext(ShoppingCartContext)
    return (
        <>
            {
                getCartItemCount(product) > 0 &&
                <Badge count={getCartItemCount(product)} />
            }
        </>
    )
}