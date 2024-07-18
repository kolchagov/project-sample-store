import React, { useEffect } from 'react'
import Product from '../../model/Product';
import Button from '../Button';
// import './ProductDetails.css'
/** global window.bootstrap */

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
            <div className="modal modal-lg fade"
                data-bs-backdrop="static" tabIndex={-1}
                role="dialog" id={'productDetailsDialog'}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
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
                        <div className="modal-footer">
                            <Button color='prominent' outline='1' onClickHandler={closeModalDialog}>Close</Button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}