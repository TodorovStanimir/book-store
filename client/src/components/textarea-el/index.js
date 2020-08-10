import React from 'react';

import styles from './index.module.css';

const TextareaEl = (props) => {
    const {
        classNameDivEl,
        classNameIEl,
        type,
        name,
        placeholder,
        isValid,
        value,
        rows,
        onChange
    } = props;

    return (
        <div className={styles[`${classNameDivEl}`]}>
            <div className="input-group-prepend">
                <span className={styles[`${isValid ? 'span-el-valid' : 'span-el-invalid'}`]}>
                    <i className={`${classNameIEl}`}></i>
                </span>
            </div>
            <textarea
                type={type ? type : "text"}
                className={isValid ? styles.valid : styles.invalid}
                name={name}
                placeholder={placeholder}
                value={value}
                rows={rows}
                onChange={e => onChange(e)}
            />
        </div>
    )
}

export default TextareaEl