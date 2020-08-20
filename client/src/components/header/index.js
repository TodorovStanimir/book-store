/* global i18n */
import React, { useContext, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './index.module.css';
import logo from '../../images/logo.png';
import { UserContext, LanguageContext } from '../../Context';
import '../../services/language-service';
import uk from '../../images/uk.png';
import bg from '../../images/bg.png';

const Header = () => {
    const { isLoggedIn, user, logOut } = useContext(UserContext);
    const { language, changeLanguage } = useContext(LanguageContext);
    const history = useHistory();

    const onClick = () => {
        logOut();
        history.push('/');
    }

    return (
        <div className={styles.sticky}>
            <div className={styles.navbar}>
                <Link to="/books/all">
                <img className={styles['nav-image']} src={logo} alt="BookStore"/>
                </Link>
                {language === 'bg'
                    ? <img className={styles['nav-image-flag']} src={uk} alt="en" data-language="en" onClick={changeLanguage} />
                    : <img className={styles['nav-image-flag']} src={bg} alt="bg" data-language="bg" onClick={changeLanguage} />
                }
                {isLoggedIn
                    ? <Fragment>
                        <li className={styles['nav-item']}>
                            <Link to="/profile/profile" className={styles['nav-link']}>{i18n('Hello', user && user.username)}</Link>
                        </li>
                        <li className={styles['nav-item']}>
                            <div onClick={onClick} className={styles['nav-link']}>{i18n('Logout')}</div>
                        </li >
                        <li className={styles['nav-item']}>
                            <Link to="/books/create" className={styles['nav-link']}>{i18n('CreateBook')}</Link>
                        </li >
                    </Fragment>
                    : <Fragment>
                        <li className={styles['nav-item']}>
                            <Link to="/profile/register" className={styles['nav-link']}>{i18n('Register')}</Link>
                        </li>
                        <li className={styles['nav-item']}>
                            <Link to="/profile/login" className={styles['nav-link']}>{i18n('Login')}</Link>
                        </li >
                    </Fragment>
                }
                <li className={styles['nav-item']}>
                    <Link to="/books/all" className={styles['nav-link']}>{i18n('Shop')}</Link>
                </li >
                <li className={styles['nav-item']}>
                    <Link to="/contact" className={styles['nav-link']}>{i18n('headerContactUs')}</Link>
                </li >
            </div >
        </div >
    )
}

export default Header