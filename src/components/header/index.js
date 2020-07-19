import React from 'react';
import styles from './index.module.css';
import logo from '../../images/logo.png'

const Header = () => {
    return (
        <div className={styles.sticky}>
            <div className={styles.navbar}>
                <img className={styles['nav-image']} src={logo} alt="BookStore" />
                <li className={styles['nav-item']}>
                    <a href="/profile/profile" className={styles['nav-link']}>Hello, user</a>
                </li>
                <li className={styles['nav-item']}>
                    <a href="/profile/register" className={styles['nav-link']}>Register</a>
                </li>
                <li className={styles['nav-item']}>
                    <a href="/profile/login" className={styles['nav-link']}>Login</a>
                </li >
                <li className={styles['nav-item']}>
                    <a href="/profile/logout" className={styles['nav-link']}>Logout</a>
                </li >
                <li className={styles['nav-item']}>
                    <a href="/profile/profile" className={styles['nav-link']}>Profile</a>
                </li >
                <li className={styles['nav-item']}>
                    <a href="/books/create" className={styles['nav-link']}>Create book</a>
                </li >
                <li className={styles['nav-item']}>
                    <a href="/books/user" className={styles['nav-link']}>My books</a>
                </li >
            </div >
        </div >
    )
}

export default Header