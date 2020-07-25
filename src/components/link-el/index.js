import React from 'react';
import { Link } from 'react-router-dom';

import styles from './index.module.css';

const LinkEl = ({ className, to, linkText }) => {
    return (
        <Link className={styles[`${className}`]} to={to}>
            <p>{linkText}</p>
        </Link>
    )
}

export default LinkEl;