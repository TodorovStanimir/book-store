import React, { Fragment } from 'react';
import styles from './index.module.css'

const Loader = (props) => {

    return props.showingLoader
        ? (
            <div className={styles.loading}>
                {window.screen.width > 400
                    ? <Fragment>
                        <div className={styles.dot} />
                        <div className={styles.dot} />
                    </Fragment>
                    : null
                }
                <div className={styles.dot} />
                <div className={styles.dot} />
                <div className={styles.dot} />
            </div>
        )
        : null
}

export default Loader