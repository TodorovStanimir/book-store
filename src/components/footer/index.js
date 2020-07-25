import React from 'react'
import moment from 'moment';
import styles from './index.module.css'

const Footer = () => {
    const today = moment(new Date()).format("dddd DD-MMMM-YYYY");
    return (
        <footer className={styles.footer}>
            <p>
                <b>Book Store @ All rights reserved &copy; {today}</b>
            </p>
        </footer>
    )
}

export default Footer