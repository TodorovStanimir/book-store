import React from 'react';
import styles from './index.module.css';
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className={styles.sticky}>
            <div className={styles.navbar}>
                <img className={styles['nav-image']} src={logo} alt="BookStore" />
                <li className={styles['nav-item']}>
                    <Link to="/profile/profile" className={styles['nav-link']}>Hello, user</Link>
                </li>
                <li className={styles['nav-item']}>
                    <Link to="/profile/register" className={styles['nav-link']}>Register</Link>
                </li>
                <li className={styles['nav-item']}>
                    <Link to="/profile/login" className={styles['nav-link']}>Login</Link>
                </li >
                <li className={styles['nav-item']}>
                    <Link to="/profile/logout" className={styles['nav-link']}>Logout</Link>
                </li >
                <li className={styles['nav-item']}>
                    <Link to="/profile/profile" className={styles['nav-link']}>Profile</Link>
                </li >
                <li className={styles['nav-item']}>
                    <Link to="/books/create" className={styles['nav-link']}>Create book</Link>
                </li >
                <li className={styles['nav-item']}>
                    <Link to="/books/user" className={styles['nav-link']}>My books</Link>
                </li >
            </div >
        </div >
    )
}

export default Header