import React, { useContext, useEffect } from 'react'
import CategoryForm from '../CategoryForm'
import { useParams } from 'react-router-dom'

export default function EditCategory() {
    const { categoryId } = useParams()

    return (
        <>
            <div className="card m-2 p-3">
                <div className="row">
                    <div className="col-sm-6">
                        <h3>Edit category</h3>
                        <CategoryForm categoryId={categoryId} />
                    </div>
                </div>
            </div>
        </>
    )
}