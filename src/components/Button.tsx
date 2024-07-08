import React, { ReactNode } from "react"
import "./Button.css"

type ButtonProps = {
    color?: "prominent" | "secondary" | "info" | "danger" | "warning" | "success" | "default"
    children: ReactNode
    size?: "btn-small" | "btn-medium" | "btn-large",
    type?: "button" | "submit" | "reset",
    className?: string,
    outline?: string,
    onClickHandler?: () => void,
}

export default function Button({
    size = "btn-medium",
    type = "button",
    color = "prominent",
    children,
    className = "",
    outline,
    onClickHandler = () => { },
    ...otherProps
}: ButtonProps) {
    let classes = `button ${color} ${size} ${className}`
    if (outline) {
        classes += ` outline-${color}`
    }
    return (
        <button {...otherProps} className={classes} type={type} onClick={onClickHandler}>{children}</button>
    )
}