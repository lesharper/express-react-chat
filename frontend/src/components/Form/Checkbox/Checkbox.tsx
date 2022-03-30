import React, {FC} from 'react';
import styles from "./checkbox.module.css"

interface CheckboxProps {
    title: string
    checked: boolean
    setChecked: (c:boolean) => void
}
const Checkbox: FC<CheckboxProps> = ({title, checked, setChecked}) => {
    return (
        <label className={styles.container}>
            <input type="checkbox"
                   checked={checked}
                   onChange={() => setChecked(!checked)}
            />
            <span className={styles.checkmark}></span>
            <span className={styles.title}>{title}</span>
        </label>
    );
}

export default Checkbox;
