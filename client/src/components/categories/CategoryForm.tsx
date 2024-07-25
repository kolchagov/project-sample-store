import React, { useContext, useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { useNavigate } from 'react-router-dom'
import CategoryContext from '../../contexts/CategoryContext'

import Button from '../Button'
import Category from '../../model/Category'

const initialValues: Category = { name: '' }

export default function CategoryForm({ categoryId }: { categoryId?: string }) {
    const navigate = useNavigate()
    const categoryMap = useContext(CategoryContext)

    const [errors, setErrors] = useState('')
    const categoryFormSubmitHandler = (values: any) => {
        const errors = validate()
        setErrors(() => errors)
        if (!errors) {
            console.log(values);
        }
    }

    const {
        values,
        changeHandler,
        submitHandler
    } = useForm({ ...initialValues }, categoryFormSubmitHandler)

    if (categoryId) {
        const category = categoryMap[categoryId]
        Object.assign(values, category)
    }

    const validate = () => {
        let errors = ''
        if (!values.name || values.name.length < 3
            || values.name.length > 15) {
            errors += 'Category name must be between 3 and 15 characters'
        }
        return errors
    }

    const blurHandler = (e) => {
        const errors = validate()
        // prevent race conditions with submitHandler
        setTimeout(() => {
            setErrors(() => errors)
        }, 200);
        return errors
    }
    return (
        <>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="categoryName" className="form-label">
                        Category name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="categoryName"
                        aria-describedby="categoryHelp"
                        placeholder="Apple"
                        name='name'
                        value={values.name}
                        onChange={changeHandler}
                        onBlur={blurHandler}
                    />
                    <div id="categoryHelp" className="form-text">
                        Give the category a short, descriptive name.
                    </div>
                </div>
                {
                    errors && <div className="alert alert-danger">{errors}</div>
                }
                <div className="d-flex">
                    <Button color='prominent' type="submit">Save</Button>
                    <Button
                        color='secondary'
                        className='mx-2'
                        type="button"
                        onClickHandler={() => navigate(-1)}
                    >Back</Button>
                </div>
            </form>
        </>
    )

}