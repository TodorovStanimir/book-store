import React from 'react';
import PageLayout from '../../components/page-layout/page-layout';

import styles from './index.module.css';
import notFoundPicture from '../../images/notFound.png'
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <PageLayout>
            <div className={styles.container}>
                <Link to="/user/login">
                    <img className={styles['not-found-image']} src={notFoundPicture} alt="404" />
                </Link>
            </div>
        </PageLayout>
    )
}

export default NotFound;