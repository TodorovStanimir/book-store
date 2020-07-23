import React from 'react';

import styles from './index.module.css';
import notFoundPicture from '../../images/notFound.png'

const NotFound = () => {
    return (
        <div className={styles.container}>
            <a href="/user/login">
                <img className={styles['not-found-image']} src={notFoundPicture} alt="404" />
            </a>
        </div>
    )
}

export default NotFound;