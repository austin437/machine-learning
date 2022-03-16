import React from "react";
import { Link } from "react-router-dom";
import classes from './styles.module.css';

function Navigation() {
    return (
        <div className={classes.container}>
            <nav className={classes.nav}>
                <ul className={classes.flexContainer}>
                    <li className={classes.flexContainer__item}>
                        <Link to="/">Menu</Link>
                    </li>
                    <li className={classes.flexContainer__item}>
                        <Link to="/home">Home</Link>
                    </li>
                    <li className={classes.flexContainer__item}>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navigation;