import React, {FC} from 'react';
import {useFormContext} from 'react-hook-form';
import styles from "./form-input.module.css";

interface FormFieldProps {
    title: string
    type?: string
    disabled?:boolean
    registerName: string
    mock?:any
}

const FormInput: FC<FormFieldProps> = ({title,type,disabled, registerName,mock}) => {
    const {register, formState} = useFormContext();
    const {errors} = formState
    return (
        <div>
            <div className={styles.form_group}>
                <input
                    type={type ?? "text"}
                    defaultValue={mock}
                    disabled={disabled ?? false}
                    {...register(registerName)}
                    className={styles.form_control}
                    style={errors[registerName] ? {borderBottom: "1px solid red"} : {}}
                    placeholder={title}
                />
                {errors[registerName] && <span className="text-red-500">{errors[registerName]?.message}</span>}
            </div>
        </div>
    );
}

export default FormInput;
