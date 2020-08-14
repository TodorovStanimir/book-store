import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import PageLayout from '../../components/page-layout';
import notFoundPicture from '../../images/notFound.png'

const NotFound = () => {
    return (
        <PageLayout>
            <div className={styles.container}>
                <Link to="/">
                    <img className={styles['not-found-image']} src={notFoundPicture} alt="404" />
                </Link>
            </div>
        </PageLayout>
    )
}

export default NotFound;