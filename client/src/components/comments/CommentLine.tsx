import React from 'react'

import { CommentType } from '../../services/CommentsService';
import { UserContext } from '../../contexts/AuthContextProvider';

import Button from '../Button';
import ConfirmModal from '../dialogs/ConfirmModal';

export default function CommentLine({ comment, deleteHandler, editHandler }:
    {
        comment: CommentType,
        deleteHandler: (commentId: string) => void,
        editHandler: (commentId: string) => void
    }) {

    const { user } = React.useContext(UserContext)
    const [prompt, setPrompt] = React.useState('')

    const deleteBtnClickHandler = () => {
        setPrompt(() => `Are you sure you want to remove comment "${comment.content}"?`)
    }

    const editBtnClickHandler = () => {
        if (comment._id) {
            editHandler(comment._id)
        }
    }

    const deleteConfirmed = () => {
        if (comment._id) {
            deleteHandler(comment._id)
        }
    }

    return (
        <>
            {
                prompt &&
                <ConfirmModal
                    title='Confirm delete'
                    confirmCallback={deleteConfirmed}
                    cancelCallback={() => setPrompt('')}
                >
                    {prompt}
                </ConfirmModal>
            }
            <div className="alert alert-light  align-items-center">
                <div className="row">
                    <section className='col-10'>
                        <span className='badge mx-2 text-bg-secondary'>
                            {comment.author?.username} gave rating: {comment.rating}
                        </span >
                        {comment.content}
                    </section>
                    {
                        user._id === comment.author?._id &&
                        <div className='col-2 d-flex justify-content-between'>
                            <Button
                                color='prominent'
                                size='btn-small'
                                onClickHandler={editBtnClickHandler}
                            >
                                <i className="fa fa-pen"></i>
                            </Button>
                            <Button
                                color='danger'
                                size='btn-small'
                                onClickHandler={deleteBtnClickHandler}
                            >
                                <i className="fa fa-trash"></i>
                            </Button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}