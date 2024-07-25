import React from 'react'

import CategoryForm from '../CategoryForm'

export default function CreateCategory() {
    return (
        <>
            <div className="card m-2 p-3">
                <div className="row">
                    <div className="col-sm-6">
                        <h3>Create category</h3>
                        <CategoryForm />
                    </div>
                </div>
            </div>
        </>
    )
}