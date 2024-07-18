import React from "react";
import Button from "../../Button";
import { SyntheticEvent } from "react";
import './Navbar.css'
import MenuItem from "../MenuItem";
import { Link } from "react-router-dom";

const navItems = [
    {
        name: 'Home',
        link: '/'
    },
    {
        name: 'About',
        link: '/about'
    },
    {
        name: 'Cart',
        link: '/cart'
    },
    {
        name: 'Login',
        link: '/login'
    },
]

export default function Navbar() {
    const setHeight = (el: HTMLElement, height: string) => {
        setTimeout(() => {
            el.style.height = height
        }, 10);
    }
    let navbarVisible = false, defaultHeight = ''

    function toggleCollapse(e: SyntheticEvent<Element, Event>) {
        const targetId = (e.target as HTMLElement).dataset.bsTarget
        if (targetId) {
            const target = document.querySelector(targetId) as HTMLElement
            if (target.classList.contains('collapse')) {
                target.classList.remove('collapse');
                defaultHeight = target.clientHeight + 'px'
                target.style.height = '0px'
            }
            if (!navbarVisible) {
                setHeight(target, defaultHeight)
            } else {
                setHeight(target, '0px')
            }
            navbarVisible = !navbarVisible
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src="./assets/img/mymag-logo.svg" alt="MyMag logo" />
                </Link>
                <div onClick={toggleCollapse}>
                    <Button className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarResponsive"
                        aria-controls="navbarResponsive"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars ms-1"></i>
                    </Button>
                </div>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                        {navItems.map((item, index) => <MenuItem key={index} href={item.link}>{item.name}</MenuItem>)}
                    </ul>
                </div>
            </div>
        </nav >
    )
}