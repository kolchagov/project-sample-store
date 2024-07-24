import React, { useContext } from "react";

import UserContext from '../../../contexts/UserContext';
import UserService from "../../../services/UserService";

import './Navbar.css'

import Button from "../../Button";
import { SyntheticEvent } from "react";
import MenuItem from "../MenuItem";
import { Link } from "react-router-dom";

enum LinkVisibility {
    All,
    Private,
    BeforeLogin,
    AdminOnly
}
const mainMenu = [
    {
        visible: LinkVisibility.All,
        name: 'Home',
        link: '/'
    },
    {
        visible: LinkVisibility.AdminOnly,
        name: 'Add Product',
        link: '/addProduct'
    },
    {
        visible: LinkVisibility.AdminOnly,
        name: 'Add Category',
        link: '/addCategory'
    },
    {
        visible: LinkVisibility.AdminOnly,
        name: 'Users',
        link: '/users'
    },
    {
        visible: LinkVisibility.BeforeLogin,
        name: 'About',
        link: '/about'
    },
    {
        visible: LinkVisibility.All,
        name: 'Cart',
        link: '/cart'
    },
    {
        visible: LinkVisibility.BeforeLogin,
        name: 'Login',
        link: '/login',
    },
    {
        visible: LinkVisibility.Private,
        name: 'Logout',
        link: '/logout'
    }
]

export default function Navbar() {
    const { user } = useContext(UserContext),
        isLogged = UserService.isLogged(user),
        isAdmin = UserService.isAdmin(user)

    const setHeight = (el: HTMLElement, height: string) => {
        setTimeout(() => {
            el.style.height = height
        }, 10);
    }
    let navbarVisible = false, defaultHeight = ''

    function toggleCollapse(e: SyntheticEvent<Element, Event>) {
        const targetId = (e.target as HTMLElement).dataset.bsTarget
        console.log(targetId);

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
                        {mainMenu.map((item, index) => {
                            if ((isLogged && item.visible !== LinkVisibility.BeforeLogin) ||
                                (isLogged && item.visible === LinkVisibility.Private) ||
                                (!isLogged && item.visible === LinkVisibility.BeforeLogin) ||
                                (item.visible === LinkVisibility.All) ||
                                (isAdmin && item.visible === LinkVisibility.AdminOnly)) {
                                return <MenuItem key={index} href={item.link}>{item.name}</MenuItem>
                            }
                        })}
                    </ul>
                </div>
            </div>
        </nav >
    )
}