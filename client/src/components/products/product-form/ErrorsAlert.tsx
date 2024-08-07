import React from 'react'

export default function ErrorsAlert({ errors }: { errors: { [id: string]: string } }) {
    return (
        <>
            {
                Object.keys(errors).length > 0 && (
                    <div className="alert alert-danger my-2" role="alert">
                        {
                            Object.values(errors).map((err, index) => (
                                <p key={index}>{err}</p>
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}