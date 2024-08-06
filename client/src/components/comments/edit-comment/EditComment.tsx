import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import CommentsService, { CommentType } from '../../../services/CommentsService'

import CommentForm from '../comment-form/CommentForm'

export default function EditComment() {
    const { productId, commentId } = useParams()
    const navigate = useNavigate()
    const [comment, setComment] = useState<CommentType>({} as CommentType)
    useEffect(() => {
        if (!commentId) return
        CommentsService.getComment(commentId).then(comment => {
            setComment(() => comment)
        })
    }, [])

    const confirmEditCommentHandler = async (values: CommentType) => {
        if (!values._id) return
        await CommentsService.editComment(values._id, values)
        navigate(-1)
    }

    const cancelHander = () => {
        navigate(-1)
    }

    return (
        <>
            <div className="card m-2 p-3">
                <div className="card-text">
                    <h5>
                        Edit your comment
                    </h5>
                    {
                        !!productId &&
                        <CommentForm
                            productId={productId}
                            comment={comment}
                            confirmHandler={confirmEditCommentHandler}
                            cancelHandler={cancelHander}
                        />
                    }
                </div>
            </div>
        </>
    )
}