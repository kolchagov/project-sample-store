import React from "react";
import { ReactNode } from 'react';
import { NavLink } from "react-router-dom";

type MenuItemProps = {
    href: string,
    className?: string,
    title?: string,
    children?: ReactNode
}

export default function MenuItem({ href, className, children, title, ...others }: MenuItemProps) {
    let classNames = "nav-link"
    if (Array.isArray(children)) [
        children = children.map((child, i) => {
            if (typeof child === 'string' && child.startsWith('icon:')) {
                return <i key={i} className={child.substring(5) + ' mx-1'}></i>
            }
            return child;
        })
    ]
    if (className) {
        classNames += ` ${className}`
    }
    return (
        <li className="nav-item">
            <NavLink className={classNames} title={title} to={href} {...others}>
                {children}
            </NavLink>
        </li>
    )
}