import React from 'react';
import styles from './index.module.css';

const ValidatorEl = ({ validator, message }) => {

    return (
        <div className={styles['info-field']}>
            {!validator ? message : ''}
        </div>
    )
}

export default ValidatorEl;