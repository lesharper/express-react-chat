import React, {FC} from 'react';
import {useFormContext} from "react-hook-form";
import styles from "./checkbox.module.css"

interface FormCheckboxProps {
    title: string
    checked: boolean
    setChecked: (c:boolean) => void
    registerName: string

}
const FormCheckbox: FC<FormCheckboxProps> = ({title, checked, setChecked, registerName}) => {
    const { register } = useFormContext();
    return (
        <label className={styles.container}>
            <input type="checkbox"
                   checked={checked}
                   {...register(registerName)}
                   onChange={() => setChecked(!checked)}
            />
            <span className={styles.checkmark}></span>
            <span className={styles.title}>{title}</span>
        </label>
    );
}

export default FormCheckbox;
