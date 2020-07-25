import React from 'react';

import styles from './undex.module.css';

const Notification = ({ show, message }) => {
    const msg = {
        'Unauthorized': 'Invalid user e-mail or password! Please try again!'
    }[message]
    return (
        show &&
             <div className={styles.loading}>
                {msg}
            </div>
    )
}

export default Notification;