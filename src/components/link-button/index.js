import React from 'react';
import { Link } from 'react-router-dom';

import styles from './index.module.css';

const LinkButton = ({ to, icon, styleDivEl, styleBtnEl }) => {
    return (
        <div className={styles[styleDivEl]}>
            <Link to={to}>
                <button className={styles[styleBtnEl]}>
                    <i className={icon}></i>
                </button>
            </Link>
        </div>
    )
}

export default LinkButton;