import React, { useContext, useEffect } from 'react'

import { useForm } from '../../../hooks/useForm'
import { CommentType } from '../../../services/CommentsService'

import Button from '../../Button'

const initialValues = { productId: '', rating: 0, content: '' }

export default function CommentForm({ productId, comment, confirmHandler, cancelHandler }:
    {
        productId: string,
        comment?: CommentType,
        confirmHandler: (values: CommentType) => void,
        cancelHandler?: () => void
    }) {

    const {
        values,
        setValues,
        changeHandler,
        submitHandler,
    } = useForm<CommentType>(
        Object.assign(initialValues, { productId }),
        (values) => {
            confirmHandler(values)
        })

    useEffect(() => {
        if (comment) {
            setValues(oldValues => ({ ...oldValues, ...comment }))
        }
    }, [comment])

    return (
        <>
            <form action="" onSubmit={submitHandler}>
                <div className="form-group row mb-3">
                    <div className="col-auto">
                        <label htmlFor="rating" className='col-form-label'>
                            Product rating:
                        </label>
                    </div>
                    <div className="col-auto">
                        <input
                            type="number"
                            className="form-control"
                            id="rating"
                            placeholder='0..5'
                            min={0}
                            max={5}
                            name="rating"
                            value={values.rating}
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="content">Comment</label>
                    <textarea
                        className="form-control"
                        id="content"
                        name="content"
                        rows={3}
                        value={values.content}
                        onChange={changeHandler}
                        placeholder='Your comment'
                    >
                    </textarea>
                </div>
                <div className="row">
                    <div className="col d-flex">
                        <Button type="submit" color='prominent'>
                            Save
                        </Button>
                        <Button
                            type="button"
                            color='default'
                            className='mx-2'
                            onClickHandler={cancelHandler}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </form>
        </>
    )
}