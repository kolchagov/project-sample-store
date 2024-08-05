import React from 'react'

export default function LabelLockable({ children, htmlFor, isLocked }:
    { children: React.ReactNode, htmlFor: string, isLocked: boolean }) {

    return (
        <>
            <label htmlFor={htmlFor} className="form-label">
                {children}
                {
                    isLocked &&
                    <span className="badge text-bg-secondary mx-1">* locked</span>
                }
            </label>
        </>
    )
}