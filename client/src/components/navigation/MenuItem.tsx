import React from "react";
import { ReactNode } from 'react';
import { NavLink } from "react-router-dom";

type MenuItemProps = {
    href: string,
    className?: string,
    children?: ReactNode
}

export default function MenuItem({ href, className, children, ...others }: MenuItemProps) {
    let classNames = "nav-link"
    if (className) {
        classNames += ` ${className}`
    }
    return (
        <li className="nav-item">
            <NavLink className={classNames} to={href} {...others}>
                {children}
            </NavLink>
        </li>
    )
}