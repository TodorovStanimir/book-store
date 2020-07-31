import React, { useContext, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './index.module.css';
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context';

const Header = () => {
    const { isLoggedIn, user, logOut } = useContext(UserContext);
    const history = useHistory();

    const onClick = () => {
        logOut();
        history.push('/');
    }

    return (
        <div className={styles.sticky}>
            <div className={styles.navbar}>
                <img className={styles['nav-image']} src={logo} alt="BookStore" />
                {isLoggedIn
                    ? <Fragment>
                        <li className={styles['nav-item']}>
                            <Link to="/profile/profile" className={styles['nav-link']}>Hello, {user && user.username}</Link>
                        </li>
                        <li className={styles['nav-item']}>
                            <div onClick={onClick} className={styles['nav-link']}>Logout</div>
                        </li >
                        <li className={styles['nav-item']}>
                            <Link to="/books/all" className={styles['nav-link']}>Shop</Link>
                        </li >
                        <li className={styles['nav-item']}>
                            <Link to="/books/create" className={styles['nav-link']}>Create book</Link>
                        </li >
                        <li className={styles['nav-item']}>
                            <Link to="/books/user" className={styles['nav-link']}>My books</Link>
                        </li >
                    </Fragment>
                    : <Fragment>
                        <li className={styles['nav-item']}>
                            <Link to="/profile/register" className={styles['nav-link']}>Register</Link>
                        </li>
                        <li className={styles['nav-item']}>
                            <Link to="/profile/login" className={styles['nav-link']}>Login</Link>
                        </li >
                        <li className={styles['nav-item']}>
                            <Link to="/books/all" className={styles['nav-link']}>Shop</Link>
                        </li >
                    </Fragment>
                }

            </div >
        </div >
    )
}

export default Header