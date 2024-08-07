import React, { useContext, useEffect } from 'react'

import { useForm } from '../../../hooks/useForm'
import { CommentType } from '../../../services/CommentsService'

import Button from '../../Button'
import ErrorsAlert from '../../common/ErrorsAlert'

const initialValues = { productId: '', rating: 0, content: '' }

export default function CommentForm({ productId, comment, confirmHandler, cancelHandler }:
    {
        productId: string,
        comment?: CommentType,
        confirmHandler: (values: CommentType) => void,
        cancelHandler?: () => void
    }) {
    const [errors, setErrors] = React.useState<{ [key: string]: string }>({})

    const validate = () => {
        const errors: { [key: string]: string } = {}
        if (values.content.length < 5) {
            errors.content = 'Comment must be at least 5 characters long'
        }
        return errors
    }

    const {
        values,
        setValues,
        changeHandler,
        submitHandler,
    } = useForm<CommentType>(
        Object.assign(initialValues, { productId }),
        (values) => {
            const err = validate()
            setErrors(err)
            if (Object.keys(err).length === 0) {
                confirmHandler(values)
            } else {
                setErrors(err)
            }
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
                            onBlur={() => setErrors(validate())}
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
                        onBlur={() => setErrors(validate())}
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
                <ErrorsAlert errors={errors} />
            </form>
        </>
    )
}