import React, {FC} from 'react';
import styles from "./sign-in.module.css"
import {useForm, FormProvider} from "react-hook-form";
import {FormLogin} from "../../../types/form"
import {yupResolver} from '@hookform/resolvers/yup';
import {loginSchema} from "../schema"
import FormInput from "../Input/FormInput";
import {Link} from "react-router-dom"
import {Icons} from "../../../types/form"

const FormSignIn: FC = () => {

    const methods = useForm<FormLogin>({mode: "onTouched", resolver: yupResolver(loginSchema)});

    const onSubmit = (formData: FormLogin) => console.log(formData);

    return (
        <FormProvider {...methods}>
            <div className={styles.container}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
                    <div className="flex h-full">
                        <div className={styles.sign_up}>
                            <span className="text-xl text-white">Добро пожаловать в Nchat!</span>
                            <Link to="/registration" className={styles.link}>Создать аккаунт</Link>
                        </div>
                        <div className={styles.sign_in}>
                            <header className={styles.title}>Авторизация</header>
                            <FormInput icon={Icons.email} title="Почта" registerName="email"/>
                            <FormInput icon={Icons.password} title="Пароль" registerName="password"/>
                            <div className={styles.footer}>
                                <button type="submit" className={styles.btn}>Войти</button>
                            </div>
                        </div>
                    </div>


                </form>
            </div>
        </FormProvider>
    );
}

export default FormSignIn;
