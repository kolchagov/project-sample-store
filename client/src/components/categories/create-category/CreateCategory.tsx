import React from 'react'
import { useNavigate } from 'react-router-dom'

import Category from '../../../model/Category'
import CategoryService from '../../../services/CategoryService'
import useCategoryMap from '../../../hooks/useCategoryMap'

import CategoryForm from '../CategoryForm'

export default function CreateCategory() {
    const { updateCategoryMap } = useCategoryMap(),
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