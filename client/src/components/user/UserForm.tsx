import React, { useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm';

import Button from '../Button';
import User from '../../model/User';
import { useNavigate } from 'react-router-dom';
import LabelLockable from '../common/LabelLockable';

const initialValues = {
    email: '',
    username: '',
    password: '',
    rePassword: '',
    address: '',
    state: '',
    city: '',
    zip: '',
    subscribed: false,
} as User;

const bulgariaStates = [
    "Blagoevgrad", "Burgas", "Dobrich", "Gabrovo", "Haskovo", "Kardzhali",
    "Kyustendil", "Lovech", "Montana", "Pazardzhik", "Pernik", "Pleven",
    "Plovdiv", "Razgrad", "Ruse", "Shumen", "Silistra", "Sliven", "Smolyan",
    "Sofia City", "Sofia Province", "Stara Zagora", "Targovishte", "Varna",
    "Veliko Tarnovo", "Vidin", "Vratsa", "Yambol",
]

export default function UserForm({ isRegisterMode, user, submitCallback, submitBtnText = 'Save' }:
    {
        isRegisterMode: boolean,
        user?:
        User,
        submitCallback:
        (user: User) => void,
        submitBtnText?: string
    }) {
    const [errors, setErrors] = useState(Array<string>())
    const navigate = useNavigate()

    const validateHandler = (propName: string, values: User): string => {
        // validate rules handler
        let errors = '';
        switch (propName) {
            case "email":
                if (!/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(values.email)) {
                    errors += "Please enter valid email";
                }
                break;
            case "username":
                if (values.username.length < 3 || values.username.length > 15) {
                    errors += "Username must be between 3 and 15 characters long";
                }
                break;
            case "password":
                if (values.password &&
                    (values.password.length < 5 || values.password.length > 15)) {
                    errors += "Password must be between 5 and 15 characters long";
                } else if (!values.password && isRegisterMode) {
                    errors += "Password is required"
                }
                break;
            case "rePassword":
                if (values.password != values.rePassword) {
                    errors += "Retyped password is diffrent from password"
                }
                break;
            case "address":
                if (!values.address || values.address.length < 8) {
                    errors += "Address must be at least 8 characters long";
                }
                break;
            case "state":
                if (!values.state || values.state === '...') {
                    errors += "State is required";
                }
                break;
            case "city":
            case "zip":
                if (!values[propName]) {
                    errors += propName + " is required";
                }
                break;
        }
        return errors;
    };

    const finalValidationCallback = (values: User) => {
        // validate all   
        const errors = Object.keys(initialValues)
            .map(propName => validateHandler(propName, values))
            .filter(e => e);

        if (!errors.length) {
            submitCallback(values);
        }
        setErrors(() => errors);
    };

    const {
        values,
        setValues,
        changeHandler,
        submitHandler
    } = useForm(initialValues, finalValidationCallback)

    useEffect(() => {
        if (user) {
            // populate missing props with initial values
            // it's importna for React controlled form
            Object.keys(initialValues).forEach(key => {
                if (user[key] === undefined) {
                    user[key] = initialValues[key]
                }
            })
            setValues(() => user)
        }
    }, [user])

    const stateSelectChangeHandler = (e) => {
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

    const checkboxChangeHandler = (e) => {
        values.subscribed = e.target.checked
        changeHandler(e)
    }

    const validateOnBlurHandler = (e) => {
        let error = validateHandler(e.target.name, values)
        setTimeout(() => {
            // we may have a race condition here with finalValidationCallback()
            !!error ? setErrors(() => [error]) : setErrors((() => []))
        }, 200)
    }

    const emailinputChangeHandler = (e) => {
        if (isRegisterMode) {
            changeHandler(e)
        }
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <div className="row justify-content-md-center m-2">
                    <div className="card p-3">
                        <div className="form-row row">
                            <div className="form-group col-12 col-md-6">
                                <LabelLockable isLocked={!isRegisterMode} htmlFor="inputEmail" >
                                    Email
                                </LabelLockable>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    id="inputEmail"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={emailinputChangeHandler}
                                    onBlur={validateOnBlurHandler}
                                    readOnly={!isRegisterMode}
                                />
                            </div>
                            <div className="form col-12 col-md-6">
                                <label htmlFor="inputUsername">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    id="inputUsername"
                                    placeholder="Username"
                                    value={values.username}
                                    onChange={changeHandler}
                                    onBlur={validateOnBlurHandler}
                                />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <LabelLockable isLocked={!isRegisterMode} htmlFor="inputPassword">
                                    Password
                                </LabelLockable>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    id="inputPassword"
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={changeHandler}
                                    onBlur={validateOnBlurHandler}
                                    readOnly={!isRegisterMode}
                                />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <LabelLockable isLocked={!isRegisterMode} htmlFor="rePassword">
                                    Retype password
                                </LabelLockable>
                                <input
                                    type="password"
                                    name="rePassword"
                                    className="form-control"
                                    id="rePassword"
                                    placeholder="Password"
                                    value={values.rePassword}
                                    onChange={changeHandler}
                                    onBlur={validateOnBlurHandler}
                                    readOnly={!isRegisterMode}
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
                                onBlur={validateOnBlurHandler}
                            />
                        </div>
                        <div className="form-row row">
                            <div className="form-group col-md-4">
                                <label htmlFor="inputState">State</label>
                                <select id="inputState"
                                    className="form-control"
                                    name='state'
                                    value={values.state}
                                    onChange={stateSelectChangeHandler}
                                    onBlur={validateOnBlurHandler}
                                >
                                    <option>...</option>
                                    {bulgariaStates.map(state =>
                                        <option key={state} value={state}>{state}</option>)
                                    }
                                </select>
                            </div >
                            <div className="form-group col-md-6">
                                <label htmlFor="inputCity">City</label>
                                <input type="text"
                                    className="form-control"
                                    id="inputCity"
                                    name="city"
                                    value={values.city}
                                    onChange={changeHandler}
                                    onBlur={validateOnBlurHandler}
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
                                    onBlur={validateOnBlurHandler}
                                />
                            </div>
                        </div >
                        <div className="form-group my-3">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="gridCheck"
                                    name="subscribed"
                                    value=""
                                    checked={values.subscribed}
                                    onChange={checkboxChangeHandler}
                                    onBlur={validateOnBlurHandler}
                                />
                                <label className="form-check-label" htmlFor="gridCheck">
                                    Subscribe for our newsletter (optional)
                                </label>
                            </div>
                        </div>
                        {
                            !!errors.length && <div className="alert alert-danger">{errors.map((e, i) => <p key={i}>{e}</p>)}</div>
                        }
                        <div className="d-flex justify-content-end">
                            <Button color='prominent' type='submit' className='mx-2'>
                                {submitBtnText}
                            </Button>
                            {
                                !isRegisterMode &&
                                <Button color='default' onClickHandler={() => navigate('/users')}>
                                    Back
                                </Button>
                            }
                        </div>
                    </div >
                </div >
            </form >
        </>
    )
}
