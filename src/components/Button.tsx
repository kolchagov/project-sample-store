import React, { ReactNode } from "react"
import "./Button.css"

type ButtonProps = {
    color?: "prominent" | "secondary" | "info" | "danger" | "warning" | "success" | "default"
    children: ReactNode
    size?: "btn-small" | "btn-medium" | "btn-large",
    className?: string
    outline?: string
}

export default function Button({ color = "prominent", children, size = "btn-medium", className = "",
    outline
}: ButtonProps) {
    let classes = `button ${color} ${size} ${className}`
    if (outline) {
        classes += `outline-${color}`
    }
    return (
        <button className={classes}>{children}</button>
    )
}