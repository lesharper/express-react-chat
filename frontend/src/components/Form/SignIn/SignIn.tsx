import React, {FC, useState} from 'react';
import styles from "./sign-in.module.css"
import {motion} from "framer-motion"
import {useForm, FormProvider} from "react-hook-form";
import {FormLogin, FormRegistration} from "../../../types/form"
import {yupResolver} from '@hookform/resolvers/yup';
import {loginSchema} from "../schema"
import FormInput from "../Input/FormInput";
import {Link, useNavigate} from "react-router-dom"
import {Icons} from "../../../types/form"
import {signIn} from "../../../requests/user";
import {useSetRecoilState} from "recoil";
import {userAtom} from "../../../store/atoms";

const SignIn: FC = () => {

    const navigate = useNavigate()
    const methods = useForm<FormLogin>({mode: "onTouched", resolver: yupResolver(loginSchema)});
    const setUser = useSetRecoilState(userAtom)

    const onSubmit = async (formData: FormLogin) => {
        const response = await signIn(formData)
        setUser(response)
        methods.reset()
        navigate('/')
    };

    const signInVariants = {
        hidden: {y: 200, opacity: 0},
        visible: {y: 0, opacity: 1},
    }
    const signUpVariants = {
        hidden: {y: -200, opacity: 0},
        visible: {y: 0, opacity: 1},
    }

    return (
        <FormProvider {...methods}>
            <div className={styles.container}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
                    <div className="flex h-full">
                        <motion.div className={styles.sign_up} variants={signUpVariants} initial='hidden' animate='visible'>
                            <span className="text-xl text-white">Добро пожаловать в Nchat!</span>
                            <Link to="/registration" className={styles.link}>Создать аккаунт</Link>
                        </motion.div>
                        <motion.div className={styles.sign_in} variants={signInVariants} initial='hidden' animate='visible'>
                            <header className={styles.title}>Авторизация</header>
                            <FormInput icon={Icons.email} title="Почта" registerName="email" />
                            <FormInput icon={Icons.password} title="Пароль" registerName="password" type="password"/>
                            <div className={styles.footer}>
                                <button type="submit" className={styles.btn}>Войти</button>
                            </div>
                        </motion.div>
                    </div>
                </form>
            </div>
        </FormProvider>
    );
}

export default SignIn;
