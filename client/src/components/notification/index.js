import React from 'react';

import styles from './undex.module.css';

const Notification = ({ show, message }) => {

    if (Array.isArray(message)) {
        return (
            show &&
            <div className={styles.loading}>
                {message.map((err,ind) => <div key={ind}>{err.msg}</div>)}
            </div>
        )
    } else {
        const msg = {
            'Error: Network Error': 'Internal Server Error! Please try again later!',
            'Error: Request failed with status code 500': 'Internal Server Error! Please try again later!',
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