import React from "react";

type IconProps = {
    names: string[]
}
export default function Icon({ names }: IconProps) {
    const classes = names.map(name => `fa-${name}`).join(' ')
    return (
        <i className={classes}></i>
    )
}