import React from 'react';

import styles from './undex.module.css';

const Notification = ({ show, message }) => {

    if (Array.isArray(message)) {
        // const msg = message.map((err,ind) => <p key={ind}>${err.msg}</p>
        return (
            show &&
            <div className={styles.loading}>
                {message.map((err,ind) => <div key={ind}>{err.msg}</div>)}
            </div>
        )
    } else {
        const msg = {
            'Unauthorized': 'Invalid user e-mail or password! Please try again!',
            '500': 'Internal Server Error! Please try again later!',
            'TypeError: Failed to fetch': 'Failed to fetch data from server',
            'undefined': 'Failed to fetch data from server'
        }[message]
        return (
            show &&
            <div className={styles.loading}>
                {msg}
            </div>
        )
    }

}

export default Notification;