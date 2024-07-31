import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Category from '../../../model/Category'
import CategoryService from '../../../services/CategoryService'
import useCategoryMap from '../../../hooks/useCategoryMap'

import ConfirmModal from '../../dialogs/ConfirmModal'
import Button from '../../Button'
import Modal from '../../dialogs/Modal'

export default function CategoryTable() {
    const { categoryMap, deleteCategory } = useCategoryMap()
    const categoryIdRef = useRef<null | string>(null)
    const navigate = useNavigate()
    const [prompt, setPrompt] = useState(''),
        [error, setError] = useState<null | string>(null)

    const categories = Object.values(categoryMap) as Category[]

    const deleteBtnClickHandler = (categoryId: string, name: string) => {
        categoryIdRef.current = categoryId
        setPrompt(() => `Are you sure you want to remove user "${name}"?`)
    }

    const deleteCategoryHandler = async () => {
        if (categoryIdRef.current) {
            try {
                await CategoryService.deleteCategory(categoryIdRef.current)
                deleteCategory(categoryIdRef.current)
            } catch (err) {
                setError(() => err.message)
            }
        }
        setPrompt(() => '')
        categoryIdRef.current = null
    }

    const cancelDeleteUser = async () => {
        setPrompt(() => '')
        categoryIdRef.current = null
    }

    return (
        <>
            {
                error &&
                <Modal title='Error' dismissModal={() => setError(null)}>
                    {error}
                </Modal>
            }
            {
                prompt &&
                <ConfirmModal
                    title='Confirmation required'
                    confirmCallback={() => deleteCategoryHandler()}
                    cancelCallback={cancelDeleteUser}
                >
                    {prompt}
                </ConfirmModal >}
            <div className="card m-2">
                <div className="card-text p-2">
                    <div className="row my-3">
                        <div className="col">
                            <h3>Edit categories</h3>
                        </div>
                        <div className="col-auto text-right">
                            <Button color='prominent' onClickHandler={() => navigate('/add-category')}>Add category</Button>
                        </div>
                    </div>
                    <table className="table table-responsive table-striped border">
                        <thead>
                            <tr>
                                <th>Category name</th>
                                <th className='text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories.map(category =>
                                    <tr key={category._id}>
                                        <td>{category.name}</td>
                                        <td className='d-flex flex-row justify-content-around'>
                                            <Button color='prominent'
                                                onClickHandler={() => navigate(`/edit-category/${category._id}`)}
                                            >
                                                <i className="fa fa-pen"></i>
                                            </Button>
                                            <Button color='danger'
                                                onClickHandler={() => category._id && deleteBtnClickHandler(category._id, category.name)}
                                            >
                                                <i className="fa-regular fa-trash-can"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}