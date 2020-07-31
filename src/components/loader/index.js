import React from 'react';
import styles from './index.module.css'

const Loader = (props) => {

    return props.showingLoader
        ? (
            <div className={styles.loading}>
                <div className={styles.dot} />
                <div className={styles.dot} />
                <div className={styles.dot} />
                <div className={styles.dot} />
                <div className={styles.dot} />
            </div>
        )
        : null
}

export default Loader