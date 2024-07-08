import React from "react";
import { ReactNode } from 'react';

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
            <a className={classNames} href={href} {...others}>
                {children}
            </a>
        </li>
    )
}