import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import Category from '../../../model/Category'
import CategoryService from '../../../services/CategoryService'
import { CategoryContext } from '../../../contexts/CategoryContext'

import CategoryForm from '../CategoryForm'

export default function CreateCategory() {
    const { updateCategoryMap } = useContext(CategoryContext),
        navigate = useNavigate()

    const persistHandler = (category: Category) => {
        CategoryService.addCategory(category).then(persistedCat => {
            updateCategoryMap(persistedCat)
            navigate('/categories')
        })
    }

    return (
        <>
            <div className="card m-2 p-3">
                <div className="row">
                    <div className="col-sm-6">
                        <h3>Create category</h3>
                        <CategoryForm persistHandler={persistHandler} />
                    </div>
                </div>
            </div>
        </>
    )
}