import React from 'react';
import styles from './index.module.css';

const InputUploadEl = (props) => {
    const {
        classNameDivEl,
        classNameIEl,
        classNameBtnEl,
        type,
        step,
        name,
        placeholder,
        isValid,
        value,
        onChange,
        disabled,
        onClick,
        btntext
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
                disabled={disabled}
                onChange={e => onChange(e)}
            />
            <button type="button" className={styles[classNameBtnEl]} onClick={e => onClick(e)}>{btntext}</button>
        </div>
    )
}

export default InputUploadEl