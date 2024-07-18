import React from "react";
import "./InputGroup.css"
import { ReactNode } from "react";

type InputGroupProps = {
    prependElement?: ReactNode,
    children: ReactNode,
    appendElement?: ReactNode
    className?: string
}

export default function InputGroup({ prependElement, children, appendElement, className = "" }: InputGroupProps) {
    return (
        <>
            <div className={`rounded ${className}`}>
                <label className="input-group">
                    <div className="input-group-prepend">
                        {prependElement}
                    </div>
                    <div className="input-group-area">
                        {children}
                    </div>
                    <div className="input-group-append">
                        {appendElement}
                    </div>
                </label>
            </div>

        </>
    )
}