import React from "react";
import Button from "../../Button";
import { SyntheticEvent } from "react";
import './Navbar.css'
import MenuItem from "../MenuItem";
import { Link } from "react-router-dom";
import UserService from "../../../services/UserService";

const navItems = [
    {
        public: true,
        name: 'Home',
        link: '/'
    },
    {
        public: false,
        name: 'Add Product',
        link: '/addProduct'
    },
    {
        public: false,
        name: 'Add Category',
        link: '/addCategory'
    },
    {
        public: false,
        name: 'Edit Users',
        link: '/users'
    },
    {
        public: true,
        isInvisibleOnLogin: true,
        name: 'About',
        link: '/about'
    },
    {
        public: true,
        name: 'Cart',
        link: '/cart'
    },
    {
        public: true,
        isInvisibleOnLogin: true,
        name: 'Login',
        link: '/login',
    },
    {
        public: false,
        name: 'Logout',
        link: '/logout'
    }
]

export default function Navbar({ isLogged }) {
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
                        {navItems.map((item, index) => {
                            if ((isLogged && !item.isInvisibleOnLogin) ||
                                (!isLogged && item.public)) {
                                return <MenuItem key={index} href={item.link}>{item.name}</MenuItem>
                            }
                        })}
                    </ul>
                </div>
            </div>
        </nav >
    )
}