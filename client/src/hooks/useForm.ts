import React from "react";
import { useState } from "react";

export function useForm<T>(initialValues: T,
    submitCallback: (values: T) => void) {
    const [values, setValues] = useState<T>(initialValues);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!e.target.name) {
            console.error("Missing name attribute: ", e.target);
        }
        // console.log(`debug me: ${e.target.name} -> ${e.target.value}`)

        const value = e.target.type === 'checkbox' ?
            (e.target as HTMLInputElement).checked : e.target.value

        setValues(prevState => ({
            ...prevState,
            [e.target.name]: value,
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
    };
}
