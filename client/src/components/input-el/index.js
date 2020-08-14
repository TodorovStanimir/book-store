import React from 'react';
import styles from './index.module.css';

const InputEl = (props) => {
    const {
        classNameDivEl,
        classNameIEl,
        type,
        step,
        name,
        placeholder,
        isValid,
        value,
        onChange
    } = props;

    return (
        <div className={styles[`${classNameDivEl}`]}>
            <div className="input-group-prepend">
                <span className={styles[`${isValid ? 'span-el-valid' : 'span-el-invalid'}`]}>
                    <i className={`${classNameIEl}`}></i>
                </span>
            </div>
            <input
                type={type ? type : "text"}
                step={step ? step : null}
                className={isValid ? styles.valid : styles.invalid}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e)}
            />
        </div>
    )
}

export default InputEl