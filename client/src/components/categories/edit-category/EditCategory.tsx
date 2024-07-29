import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Category from '../../../model/Category'
import CategoryService from '../../../services/CategoryService'

import CategoryForm from '../CategoryForm'
import useCategoryMap from '../../../hooks/useCategoryMap'

export default function EditCategory() {
    const { categoryId } = useParams(),
        { updateCategoryMap } = useCategoryMap(),
        navigate = useNavigate()

    const persistHandler = (category: Category) => {
        // TODO: implement
    }

    return (
        <>
            <div className="card m-2 p-3">
                <div className="row">
                    <div className="col-sm-6">
                        <h3>Edit category</h3>
                        <CategoryForm categoryId={categoryId} persistHandler={persistHandler} />
                    </div>
                </div>
            </div>
        </>
    )
}