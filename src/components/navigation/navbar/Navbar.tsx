import React from "react";
import Button from "../../Button";
import { SyntheticEvent } from "react";
import './Navbar.css'
import MenuItem from "../MenuItem";

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
                <a className="navbar-brand" href="#page-top">
                    <img src="./assets/img/mymag-logo.svg" alt="MyMag logo" />
                </a>
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
                        <MenuItem href="#services">Services</MenuItem>
                        <MenuItem href="#">Portfolio</MenuItem>
                        <MenuItem href="#">About</MenuItem>
                        <MenuItem href="#">Team</MenuItem>
                        <MenuItem href="#">Contact</MenuItem>
                    </ul>
                </div>
            </div>
        </nav >
    )
}