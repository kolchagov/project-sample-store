import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Category from '../../../model/Category'
import UserService from '../../../services/UserService'
import CategoryService from '../../../services/CategoryService'
import useCategoryMap from '../../../hooks/useCategoryMap'

import ConfirmModal from '../../dialogs/ConfirmModal'
import Button from '../../Button'

export default function CategoryTable() {
    const { categoryMap, deleteCategory } = useCategoryMap()
    const categoryIdRef = useRef<null | string>(null)
    const navigate = useNavigate()
    const [categories, setCategories] = useState<Category[]>([])
    const [prompt, setPrompt] = useState('')

    useEffect(() => {
        setCategories(() => Object.values(categoryMap))
    }, [categoryMap])

    const deleteBtnClickHandler = (categoryId: string, name: string) => {
        categoryIdRef.current = categoryId
        setPrompt(() => `Are you sure you want to remove user "${name}"?`)
    }

    const deleteCategoryHandler = async () => {
        if (categoryIdRef.current) {
            try {
                await CategoryService.deleteCategory(categoryIdRef.current)
                deleteCategory(categoryMap[categoryIdRef.current])
            } catch (err) {
                console.log(err);
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
            {prompt &&
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