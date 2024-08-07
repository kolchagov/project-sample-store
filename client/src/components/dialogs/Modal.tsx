import React, { useEffect } from 'react'
import Button from '../Button'
import './Modal.css'

type ModalProps = {
    dismissModal: () => void,
    title?: string,
    extraClass?: string,
    children?: React.ReactNode
}

export default function Modal({ dismissModal, children, extraClass, title }: ModalProps) {
    let gallery: bootstrap.Modal | null = null,
        classes = `modal fade`
    if (extraClass) classes += ` ${extraClass}`
    useEffect(() => {
        if (!gallery) {
            gallery = new window.bootstrap.Modal(document.getElementById('productDetailsDialog') as HTMLElement, {
                keyboard: false
            });
            gallery.show()
        }
        return () => {
            //unmount component
            gallery?.hide()
        }
    }, [])

    return (
        <>
            <div className={classes}
                data-bs-backdrop="static" tabIndex={-1}
                role="dialog" id={'productDetailsDialog'}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        {title &&
                            <div className="modal-header">
                                {title}
                            </div>
                        }
                        <section className='m-2 px-2'>
                            {children}
                        </section>
                        <div className="modal-footer">
                            <Button color='prominent' outline='1' onClickHandler={dismissModal}>Close</Button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}