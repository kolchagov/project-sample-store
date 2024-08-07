import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { useForm } from '../../../hooks/useForm';

import Product from '../../../model/Product'
import Button from '../../Button';
import CategorySelector from '../../categories/category-selector/CategorySelector';
import ErrorsAlert from './ErrorsAlert';

const initialValues = {
    make: "",
    model: "",
    price: 0,
    categoryId: "default",
    description: "",
    img: "",
    material: "",
    year: new Date().getFullYear(),
}

export default function ProductForm({ product, submitCallback }:
    { product: Product, submitCallback: (p: Product) => void }) {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({} as any)

    const validate = () => {
        const errors = {} as any

        if (!values.price) {
            errors.price = 'Price is required'
        }
        if (!values.description) {
            errors.description = 'Description is required'
        }
        if (!values.img) {
            errors.img = 'Image is required'
        }
        if (!values.make) {
            errors.make = 'Make is required'
        }
        if (!values.model) {
            errors.model = 'Model is required'
        }
        if (!values.year) {
            errors.year = 'Year is required'
        }
        return errors
    }

    const {
        values,
        submitHandler,
        changeHandler
    } = useForm(Object.assign(initialValues, product), (values) => {
        const errors = validate();
        if (Object.keys(errors).length) {
            setErrors(errors)
            return
        }
        submitCallback(values)
    });

    const [imageSrc, setImageSrc] = useState(values.img)

    const updateImage = () => {
        setImageSrc(() => values.img || "/assets/img/img-placeholder.jpg");
    }

    useEffect(() => {
        updateImage()
    }, [product.img])

    const onblurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name,
            errors = validate()
        if (errors[name]) {
            setErrors(() => {
                return { [name]: errors[name] }
            })
        }
    }

    return (
        <>
            <div className="">
                <form action="" onSubmit={submitHandler}>
                    <div className="form-row row">
                        <div className="form-group col-md-6">
                            <div className="  mb-3">
                                <label htmlFor="productName" className="form-label">
                                    Product name or make
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Lenovo Ideapad 15"
                                    aria-label="Product name"
                                    value={values.make}
                                    onChange={changeHandler}
                                    name='make'
                                    onBlur={onblurHandler}
                                />
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <div className="mb-3">
                                <label htmlFor="model" className="form-label">
                                    Model
                                </label>
                                <input
                                    type="text"
                                    id="model"
                                    className="form-control"
                                    placeholder="Ideapad 700"
                                    aria-label="Model"
                                    value={values.model}
                                    onChange={changeHandler}
                                    name='model'
                                    onBlur={onblurHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-row row">
                        <div className="form-group col-md-4 mb-3">
                            <label htmlFor="materialInput" className="form-label">
                                Material&nbsp;
                                <span className='badge text-bg-secondary'>optional</span>
                            </label>
                            <input
                                type="text"
                                id='materialInput'
                                className="form-control"
                                placeholder="Plastic"
                                aria-label="Year"
                                name='material'
                                value={values.material}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="form-group col-md-2 mb-3">
                            <label htmlFor="yearInput" className="form-label">
                                Year
                            </label>
                            <input
                                type="number"
                                id='yearInput'
                                className="form-control"
                                placeholder="Year"
                                aria-label="Year"
                                name='year'
                                value={values.year}
                                onChange={changeHandler}
                                onBlur={onblurHandler}
                            />
                        </div>
                        <div className="form-group col-md-4 mb-3">
                            <label htmlFor="category" className="form-label">
                                Category
                            </label>
                            <CategorySelector
                                id="category"
                                className="form-control"
                                aria-label="Category"
                                name='categoryId'
                                value={values.categoryId}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="form-group col-md-2 mb-3">
                            <label htmlFor="priceInput" className="form-label">
                                Price
                            </label>
                            <input
                                type="number"
                                id='priceInput'
                                min={0}
                                step={0.01}
                                className="form-control"
                                aria-label='Price'
                                name='price'
                                value={values.price}
                                onChange={changeHandler}
                                onBlur={onblurHandler}
                            />
                        </div>
                    </div>
                    <div className="form-row row">
                        <div className="col-md-4 sm-mb-3">
                            <div className="card">
                                <img
                                    src={imageSrc}
                                    className="card-img-top img-fluid"
                                    alt="image"
                                />
                                <div className="card-body">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">
                                            URL
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            aria-label="image_url"
                                            name='img'
                                            value={values.img}
                                            onChange={changeHandler}
                                            onBlur={() => updateImage()}
                                        />
                                    </div>
                                    <div className="input-group ">
                                        <label className="input-group-text" htmlFor="customFile">
                                            Select picture
                                            <input
                                                type="file"
                                                id="customFile"
                                                className="form-control collapse"
                                                placeholder="Year"
                                                aria-label="Year"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-8">
                            <label
                                htmlFor="inputDescription"
                                className="form-label"
                            >
                                Description
                            </label>
                            <textarea
                                className="form-control"
                                id="inputDescription"
                                rows={17}
                                placeholder='Give a detailed description of the product'
                                name="description"
                                onChange={changeHandler}
                                value={values.description}
                                onBlur={onblurHandler}
                            >
                            </textarea>
                        </div>
                    </div>
                    <ErrorsAlert errors={errors} />
                    <div className="d-flex mt-3">
                        <Button color='prominent' type='submit' className='mx-2'>Save</Button>
                        <Button color='default' onClickHandler={() => navigate("/catalog")}>Cancel</Button>
                    </div>
                </form >
            </div >
        </>
    )
}