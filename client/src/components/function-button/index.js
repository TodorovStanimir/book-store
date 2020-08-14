import React from 'react';
import styles from './index.module.css';

const FunctionButton = ({ funct, icon, styleDivEl, styleBtnEl, bookId }) => {
    return (
        <div className={styles[styleDivEl]}>
            <button className={styles[styleBtnEl]} onClick={() => funct(bookId)}>
                <i className={icon}></i>
            </button>
        </div>
    )
}

export default FunctionButton;