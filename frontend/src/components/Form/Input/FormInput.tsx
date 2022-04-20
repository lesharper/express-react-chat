import React, {FC} from 'react';
import {useFormContext} from 'react-hook-form';
import styles from "./form-input.module.css";
import {Icons} from "../../../types/form"
import {KeyIcon, MailIcon, UserIcon} from "@heroicons/react/outline";

interface FormFieldProps {
    icon?: Icons
    title: string
    type?: string
    disabled?:boolean
    registerName: string
    mock?:any
}

const FormInput: FC<FormFieldProps> = ({icon, title,type,disabled, registerName,mock}) => {
    const {register, formState} = useFormContext();
    const {errors} = formState
    return (
        <div>
            <div className={styles.form_group}>
                {icon === Icons.username
                    ? <UserIcon className={styles.icon}/>
                    : icon === Icons.password
                        ? <KeyIcon className={styles.icon}/>
                        : icon === Icons.email
                            ? <MailIcon className={styles.icon}/>
                            : ''
                }

                <input
                    type={type ?? "text"}
                    defaultValue={mock}
                    disabled={disabled ?? false}
                    {...register(registerName)}
                    className={styles.form_control}
                    style={errors[registerName] ? {borderBottom: "1px solid red"} : {}}
                    placeholder={errors[registerName] ? errors[registerName]?.message : title}
                />
            </div>
        </div>
    );
}

export default FormInput;
