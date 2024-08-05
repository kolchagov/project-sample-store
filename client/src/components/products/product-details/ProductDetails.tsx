import React, { useContext } from 'react'

import { CategoryContext } from '../../../contexts/CategoryContext';
import CategoryService from '../../../services/CategoryService';
import { CategoryMapType } from '../../../model/Category';

import Product from '../../../model/Product';
import Modal from '../../dialogs/Modal';

/** global window.bootstrap */

type PoductDetailsProps = {
    product: Product,
    dismissModal: () => void
}

export default function ProductDetails({ product, dismissModal }: PoductDetailsProps) {
    const { categoryMap } = useContext(CategoryContext)

    const getCategoryName = (categoryMap: CategoryMapType, product: Product) => {
        return CategoryService.getCategoryName(categoryMap, product.categoryId);
    }

    return (
        <>
            <Modal dismissModal={dismissModal} extraClass='modal-lg'>
                <section className='m-2'>
                    <div className="d-flex align-items-center">
                        <div className="float-none float-md-start px-2">
                            <img src={product.img} alt={product.model} className="img-responsive mw-100" />
                        </div>
                        <div className="flex-col text-center mx-3 w-100">
                            <h5><strong>{product.make} {product.model}</strong></h5>
                            <h6>Detailed description</h6>
                        </div>
                    </div>
                    {
                        product.categoryId &&
                        <div className="flex-col">
                            Category: <strong>{getCategoryName(categoryMap, product)}</strong>
                        </div>
                    }
                    {product.year && <div>Year: <strong>{product.year}</strong></div>}
                    {product.material && <div>Material: <strong>{product.material}</strong></div>}
                    <div className="fs-6 fw-light lh-sm" dangerouslySetInnerHTML={{ __html: product.description }}></div>
                </section>
            </Modal>
        </>
    )
}