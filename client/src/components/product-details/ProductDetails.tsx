import React, { useEffect } from 'react'
import Product from '../../model/Product';
import Button from '../Button';
import Modal from '../dialogs/Modal';
// import './ProductDetails.css'
/** global window.bootstrap */

type PoductDetailsProps = {
    product: Product,
    dismissModal: () => void
}

export default function ProductDetails({ product, dismissModal }: PoductDetailsProps) {

    return (
        <>
            <Modal dismissModal={dismissModal} extraClass='modal-lg'>
                <section className='m-2'>
                    <div className="d-flex align-items-center">
                        <div className="float-none float-md-start px-2">
                            <img src={product.image} alt={product.name} className="img-responsive mw-100" />
                        </div>
                        <div className="flex-col">
                            <h5><strong>{product.name}</strong></h5>
                            <h5>Detailed description</h5>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="fs-6 fw-light lh-sm" dangerouslySetInnerHTML={{ __html: product.description }}></div>
                </section>
            </Modal>
        </>
    )
}