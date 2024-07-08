import React, { useEffect } from 'react'
import Product from '../../model/Product';
import Button from '../Button';
// import './ProductDetails.css'

type PoductDetailsProps = {
    product: Product,
    dismissModal: () => void
}

export default function ProductDetails({ product, dismissModal }: PoductDetailsProps) {
    let gallery: bootstrap.Modal | null = null
    useEffect(() => {
        if (!gallery) {
            gallery = new window.bootstrap.Modal(document.getElementById('productDetailsDialog') as HTMLElement, {
                keyboard: false
            });
            gallery.show()
        }
    }, [])

    function closeModalDialog() {
        gallery?.hide()
        console.log("debug me");
        dismissModal()
    }

    return (
        <>
            <div className="modal  fade"
                data-bs-backdrop="static" tabIndex={-1}
                role="dialog" id={'productDetailsDialog'}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <section className='m-2'>
                            <div className="float-none float-md-start px-2">
                                <img src={product.image} alt={product.name} className="img-responsive " />
                            </div>
                            <h5>Detailed description about <strong>{product.name}</strong></h5>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nulla!</p>
                        </section>
                        <div className="modal-footer">
                            <Button color='prominent' outline='1' onClickHandler={closeModalDialog}>Close</Button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}