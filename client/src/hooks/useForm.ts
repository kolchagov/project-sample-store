import React from "react";
import { useState } from "react";

export function useForm(initialValues: any, submitCallback: (values: any) => void) {
    const [values, setValues] = useState(initialValues);

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
        changeHandler,
        submitHandler,
    };
}
