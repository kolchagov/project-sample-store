import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'

import Button from '../Button'
import Category from '../../model/Category';

const initialValues: Category = { name: '' }

export default function CategoryForm({ category, persistHandler }: { category?: Category, persistHandler: (category: Category) => void }) {
    const navigate = useNavigate()
    const [errors, setErrors] = useState('')

    const categoryFormSubmitHandler = (values: any) => {
        const errors = validate()
        setErrors(() => errors)
        if (!errors) {
            persistHandler(values)
        }
    }

    const {
        values,
        setValues,
        changeHandler,
        submitHandler
    } = useForm({ ...initialValues }, categoryFormSubmitHandler)

    useEffect(() => {
        if (category) setValues(() => ({ ...category }))
    }, [category])

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