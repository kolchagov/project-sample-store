import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { UserContext } from '../../contexts/AuthContextProvider';
import CommentsService, { CommentType } from '../../services/CommentsService';

import Button from '../Button';
import CommentLine from './CommentLine';

export default function Comments() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const { productId } = useParams()
    const [comments, setComments] = React.useState([] as CommentType[])

    useEffect(() => {
        CommentsService.getComments(productId)
            .then(comments => setComments(comments))
            .catch(err => console.log(err))
    }, [])

    function addComment() {
        navigate(`/add-comment/${productId}`)
    }

    const deleteCommentHandler = async (commentId: string) => {
        await CommentsService.deleteComment(commentId)
        setComments(comments.filter(c => c._id !== commentId))
    }
    const editCommentHandler = (commentId: string) => {
        navigate(`/edit-comment/${productId}/${commentId}`)
    }

    return (
        <>
            <div className='card m-2 p-3'>
                <div className="card-heading">
                    <h4>User comments about this product</h4>
                </div>
                <div className="d-flex align-items-center">
                    <div className="flex-col text-center mx-3 w-100">
                    </div>
                </div>
                <div className="card-text">
                    {
                        !comments.length ?
                            <div className="alert alert-default">
                                No comments yet. Be the first to comment (requires login)!
                            </div>
                            :
                            comments.map(comment =>
                                <CommentLine
                                    key={comment._id}
                                    comment={comment}
                                    editHandler={editCommentHandler}
                                    deleteHandler={deleteCommentHandler}
                                />
                            )
                    }
                    <div className="row">
                        <div className="col d-flex">
                            {
                                !!user.accessToken &&
                                <Button
                                    color='prominent'
                                    onClickHandler={addComment}
                                >
                                    Add comment
                                </Button>
                            }
                            <Button
                                color='default'
                                className='mx-2'
                                onClickHandler={() => navigate(-1)}
                            >
                                Go back
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}