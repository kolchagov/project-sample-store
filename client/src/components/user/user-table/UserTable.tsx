import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import User from '../../../model/User'
import { UserContext } from '../../../contexts/AuthContextProvider'

import Button from '../../Button'
import UserService from '../../../services/UserService'
import ConfirmModal from '../../dialogs/ConfirmModal';

export default function UserTable() {
    const { user } = useContext(UserContext)
    const userIdRef = useRef<null | string>(null)
    const navigate = useNavigate()
    const [users, setUsers] = useState<User[]>([])
    const [prompt, setPrompt] = useState('')


    useEffect(() => {
        if (!UserService.isAdmin(user)) {
            navigate('/')
        }
        UserService.getUsers().then(dbUsers => {
            setUsers(dbUsers)
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
                setUsers(users.filter(user => user._id !== userIdRef.current))
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
                    <h3>Users table</h3>
                    {users.length === 0 ?
                        <div className="alert alert-info">
                            No users found.
                        </div>
                        :
                        <table className="table table-responsive table-striped border">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th className='text-center'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map(user =>
                                        <tr key={user._id}>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td className='d-flex flex-row justify-content-around'>
                                                <Button color='prominent'
                                                    onClickHandler={() => navigate(`/edit-user/${user._id}`)}
                                                >
                                                    <i className="fa fa-pen"></i>
                                                </Button>
                                                <Button color='danger'
                                                    onClickHandler={() => user._id && deleteBtnClickHandler(user._id, user.username)}
                                                >
                                                    <i className="fa-regular fa-trash-can"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}