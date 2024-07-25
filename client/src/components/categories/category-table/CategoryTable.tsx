import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Category from '../../../model/Category'
import UserContext from '../../../contexts/UserContext'
import UserService from '../../../services/UserService'

import ConfirmModal from '../../dialogs/ConfirmModal'
import Button from '../../Button'
import CategoryService from '../../../services/CategoryService'

export default function CategoryTable() {
    const { user } = useContext(UserContext)
    const userIdRef = useRef<null | string>(null)
    const navigate = useNavigate()
    const [categories, setCategories] = useState<Category[]>([])
    const [prompt, setPrompt] = useState('')


    useEffect(() => {
        if (!UserService.isAdmin(user)) {
            navigate('/')
        }
        CategoryService.getCategoryMap().then(categoryMap => {
            const values = Object.values(categoryMap)
            setCategories(values)
        })
    }, [])

    const deleteBtnClickHandler = (userId: string, username: string) => {
        userIdRef.current = userId
        setPrompt(() => `Are you sure you want to remove user "${username}"?`)
    }

    const deleteUser = async () => {
        if (userIdRef.current) {
            try {
                await UserService.deleteUser(userIdRef.current)
                console.log('debug me: USER DELETETED');
                setCategories(categories.filter(user => user._id !== userIdRef.current))
            } catch (err) {
                console.log(err);
            }
        }
        setPrompt(() => '')
        userIdRef.current = null
    }

    const cancelDeleteUser = async () => {
        setPrompt(() => '')
        userIdRef.current = null
    }

    return (
        <>
            {prompt &&
                <ConfirmModal
                    title='Confirmation required'
                    confirmCallback={() => deleteUser()}
                    cancelCallback={cancelDeleteUser}
                >
                    {prompt}
                </ConfirmModal >}
            <div className="card m-2">
                <div className="card-text p-2">
                    <div className="row my-3">
                        <div className="col">
                            <h3>Edit categories</h3>
                        </div>
                        <div className="col-auto text-right">
                            <Button color='prominent' onClickHandler={() => navigate('/add-category')}>Add category</Button>
                        </div>
                    </div>
                    <table className="table table-responsive table-striped border">
                        <thead>
                            <tr>
                                <th>Category name</th>
                                <th className='text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories.map(category =>
                                    <tr key={category._id}>
                                        <td>{category.name}</td>
                                        <td className='d-flex flex-row justify-content-around'>
                                            <Button color='prominent'
                                                onClickHandler={() => navigate(`/edit-category/${category._id}`)}
                                            >
                                                <i className="fa fa-pen"></i>
                                            </Button>
                                            <Button color='danger'
                                                onClickHandler={() => category._id && deleteBtnClickHandler(category._id, category.name)}
                                            >
                                                <i className="fa-regular fa-trash-can"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}