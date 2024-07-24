import React, { useContext, useState } from 'react'
import { useForm } from '../../hooks/useForm';

import Button from '../Button';
import UserService from '../../services/UserService';
import Login from './Login';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../dialogs/Modal';

type RegisterUserType = {
    email: string,
    username: string,
    password: string,
    address: string,
    state: string,
    city: string,
    zip: string,
    subscribed: boolean,
}

export default function RegisterUser() {
    const [errors, setErrors] = useState(Array<string>()),
        [userCreated, setUserCreated] = useState(false),
        navigate = useNavigate()
    const { values, setValues, changeHandler, submitHandler, validateHandler } = useForm({
        email: '', //intial values
        username: '',
        password: '',
        address: '',
        state: '',
        city: '',
        zip: '',
        subscribed: false,
    } as RegisterUserType, async () => {
        // validate all   
        const errors = Object.keys(values).map(propName => validateHandler(propName, values)).filter(e => e)
        if (!errors.length) { // submit handler
            try {
                const user = await UserService.register(values)
                setUserCreated(() => true)
            } catch (err) {
                //TODO handle error
                console.log(err);

            }
        } else {
            setErrors(() => errors)
        }
    }, (propName, values) => {
        // validate rules handler
        let errors = ''
        switch (propName) {
            case "email":
                if (!/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(values.email)) {
                    errors += "Please enter valid email"
                }
                break;
            case "username":
                if (values.username.length < 3 || values.username.length > 15) {
                    errors += "Username must be between 3 and 15 characters long"
                }
                break;
            case "password":
                if (values.password.length < 5 || values.password.length > 15) {
                    errors += "Password must be between 5 and 15 characters long"
                }
                break;
            case "address":
                if (values.address.length < 8) {
                    errors += "Address must be at least 8 characters long"
                }
                break;
            case "state":
                if (!values.state || values.state === '...') {
                    errors += "State is required"
                }
                break;
            case "city":
            case "zip":
                if (!values[propName]) {
                    errors += propName + " is required"
                }
                break;
        }
        return errors
    })

    function stateChangeHandler(e) {
        if (!values.city || values.city == values.state) {
            // if city is empty, set city equal to state
            const newValues = {
                ...values,
                city: e.target.value,
                state: e.target.value
            }
            setValues(() => newValues)
        } else {
            changeHandler(e)
        }
    }

    function checkboxChangeHandler(e) {
        values.subscribed = e.target.checked
        changeHandler(e)
        console.log("debug me", values.subscribed);
    }

    function validate(e) {
        const error = validateHandler(e.target.name, values)
        setErrors(() => [error])
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <div className="row justify-content-md-center m-2">
                    <div className="card p-3">
                        <div className="form-row row">
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="inputEmail">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    id="inputEmail"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={changeHandler}
                                    onBlur={validate}
                                />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="inputPassword">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    id="inputPassword"
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={changeHandler}
                                    onBlur={validate}
                                />
                            </div>
                            <div className="form col-12 col-md-6">
                                <label htmlFor="inputUsername">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    id="inputUsername"
                                    placeholder="Username"
                                    value={values.username}
                                    onChange={changeHandler}
                                    onBlur={validate}
                                />
                            </div>

                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAddress">Address</label>
                            <input
                                type="text"
                                name="address"
                                className="form-control"
                                id="inputAddress"
                                placeholder="1234 Main St"
                                value={values.address}
                                onChange={changeHandler}
                                onBlur={validate}
                            />
                        </div>
                        <div className="form-row row">
                            <div className="form-group col-md-4">
                                <label htmlFor="inputState">State</label>
                                <select id="inputState"
                                    className="form-control"
                                    name='state'
                                    value={values.state}
                                    onChange={stateChangeHandler}
                                    onBlur={validate}
                                >
                                    <option>...</option>
                                    <option value="Blagoevgrad">Blagoevgrad</option>
                                    <option value="Burgas">Burgas</option>
                                    <option value="Dobrich">Dobrich</option>
                                    <option value="Gabrovo">Gabrovo</option>
                                    <option value="Haskovo">Haskovo</option>
                                    <option value="Kardzhali">Kardzhali</option>
                                    <option value="Kyustendil">Kyustendil</option>
                                    <option value="Lovech">Lovech</option>
                                    <option value="Montana">Montana</option>
                                    <option value="Pazardzhik">Pazardzhik</option>
                                    <option value="Pernik">Pernik</option>
                                    <option value="Pleven">Pleven</option>
                                    <option value="Plovdiv">Plovdiv</option>
                                    <option value="Razgrad">Razgrad</option>
                                    <option value="Ruse">Ruse</option>
                                    <option value="Shumen">Shumen</option>
                                    <option value="Silistra">Silistra</option>
                                    <option value="Sliven">Sliven</option>
                                    <option value="Smolyan">Smolyan</option>
                                    <option value="Sofia City">Sofia City</option>
                                    <option value="Sofia Province">Sofia Province</option>
                                    <option value="Stara Zagora">Stara Zagora</option>
                                    <option value="Targovishte">Targovishte</option>
                                    <option value="Varna">Varna</option>
                                    <option value="Veliko Tarnovo">Veliko Tarnovo</option>
                                    <option value="Vidin">Vidin</option>
                                    <option value="Vratsa">Vratsa</option>
                                    <option value="Yambol">Yambol</option>

                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputCity">City</label>
                                <input type="text"
                                    className="form-control"
                                    id="inputCity"
                                    name="city"
                                    value={values.city}
                                    onChange={changeHandler}
                                    onBlur={validate}
                                />
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="inputZip">Zip</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputZip"
                                    name="zip"
                                    value={values.zip}
                                    onChange={changeHandler}
                                    onBlur={validate}
                                />
                            </div>
                        </div>
                        <div className="form-group my-3">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="gridCheck"
                                    name="subscribed"
                                    value=""
                                    onChange={checkboxChangeHandler}
                                    onBlur={validate}
                                />
                                <label className="form-check-label" htmlFor="gridCheck">
                                    Subscribe for our newsletter (optional)
                                </label>
                            </div>
                        </div>
                        {
                            !!errors.length && <div className="alert alert-danger">{errors.map((e, i) => <p key={i}>{e}</p>)}</div>
                        }
                        {
                            !userCreated ?
                                <Button color='prominent' type='submit'>
                                    Sign up
                                </Button> :
                                <>
                                    <Modal title='Success' dismissModal={() => { navigate('/login') }} >
                                        <h5>User registered successfully</h5>
                                        <p>Please login to continue</p>
                                    </Modal>
                                </>
                        }
                    </div>
                </div >
            </form>
        </>
    )
}