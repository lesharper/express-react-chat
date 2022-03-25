import React, {FC} from 'react';
import {FormProvider, useForm} from "react-hook-form";
import {FormRegistration} from "../../../types/form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {registrationSchema} from "../schema";
import styles from "./sign-up.module.css";
import FormInput from "../Input/FormInput";
import {Link} from "react-router-dom";
import FormFile from "../FileInput/FormFile";
import {Icons} from "../../../types/form"

const FormSignUpt: FC = () => {
    const methods = useForm<FormRegistration>({mode:"onTouched",resolver: yupResolver(registrationSchema)});

    const onSubmit = (formData: FormRegistration) => console.log(formData);

    return (
        <FormProvider {...methods}>
            <div className={styles.container}>

                <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
                    <div className="flex h-full">
                        <div className={styles.sign_in}>
                            <header className={styles.title}>Регистрация</header>
                            <FormInput icon={Icons.username} title="Имя пользователя" registerName="username"/>
                            <FormInput icon={Icons.email} title="Почта" registerName="email"/>
                            <FormInput icon={Icons.password} title="Пароль" registerName="password"/>
                            <div className="ml-10 my-2">
                                <FormFile title="Загрузить аватар" registerName="avatar"/>
                            </div>
                            <div className={styles.footer}>
                                <button type="submit" className={styles.btn}>Создать</button>
                            </div>
                        </div>
                        <div className={styles.sign_up}>
                            <span className="text-xl text-white">С возвращением!</span>
                            <Link to="/login" className={styles.link}>Войти</Link>
                        </div>
                    </div>
                </form>
            </div>
        </FormProvider>
    );
}

export default FormSignUpt;
