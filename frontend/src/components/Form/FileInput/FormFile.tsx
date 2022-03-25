import React, {FC, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import styles from "./form-file.module.css";

interface FormFieldProps {
    title: string
    registerName: string
}

const FormFile: FC<FormFieldProps> = ({title, registerName}) => {
    const {register, formState} = useFormContext();
    const {errors} = formState
    return (
        <div>
            <label className={styles.form_file}>
                <span className={styles.form_title}>{title}</span>
                <input
                    type="file"
                    {...register(registerName)}
                    className={styles.form_file_input}
                    style={errors[registerName] ? {border: "1px solid red"} : {}}
                    placeholder={errors[registerName]?.message}
                />
            </label>
        </div>
    );
}

export default FormFile;
