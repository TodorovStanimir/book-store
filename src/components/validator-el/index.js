import React from 'react';

import styles from './index.module.css';

const ValidatorEl = ({ validator, message }) => {

    return (
        !validator
            ? <div className={styles['info-field']}>
                {message}
            </div>
            : null
    )
}

export default ValidatorEl;