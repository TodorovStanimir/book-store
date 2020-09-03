import React, { useContext } from 'react';
import styles from './undex.module.css';
import { UserContext } from '../../Context';

const Notification = ({ show, message }) => {
    const { logOut } = useContext(UserContext);
    if (Array.isArray(message)) {
        return (
            show &&
            <div className={styles.loading}>
                {message.map((err, ind) => <div key={ind}>{err.msg}</div>)}
            </div>
        )
    } else {
        const msg = {
            'Error: Network Error': 'Internal Server Error! Please try again later!',
            'Error: Request failed with status code 500': 'Internal Server Error! Please try again later!',
            'TypeError: Failed to fetch': 'Failed to fetch data from server',
            'successful exit': 'Logout successfully!',
            'Error: Request failed with status code 401': 'You are unauthorized!!!',
            'undefined': 'Failed to fetch data from server'
        }[message]
        if (msg === 'You are unauthorized!!!') {
            logOut('noNotification');
        }
        return (
            show &&
            <div className={styles.loading}>
                {msg}
            </div>
        )
    }
}

export default Notification;