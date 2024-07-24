import React from "react";
import { useState } from "react";

export function useForm<T>(initialValues: T,
    submitCallback: (values: T) => void,
    validateHandler: (name: string, values: T) => string = () => '') {
    const [values, setValues] = useState<T>(initialValues);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submitCallback(values);
    };

    return {
        values,
        setValues,
        changeHandler,
        submitHandler,
        validateHandler,
    };
}
