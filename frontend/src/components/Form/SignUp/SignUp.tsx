import React, {FC} from 'react';
import {FormProvider, useForm} from "react-hook-form";
import {FormRegistration} from "../../../types/form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {registrationSchema} from "../schema";
import styles from "./sign-up.module.css";
import {motion} from "framer-motion"
import FormInput from "../Input/FormInput";
import {Link} from "react-router-dom";
import FormFile from "../FileInput/FormFile";
import {Icons} from "../../../types/form"

const SignUp: FC = () => {
    const methods = useForm<FormRegistration>({mode:"onTouched",resolver: yupResolver(registrationSchema)});

    const onSubmit = (formData: FormRegistration) => console.log(formData);

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
                        <motion.div className={styles.sign_in} variants={signInVariants} initial='hidden' animate='visible'>
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
                        </motion.div>
                        <motion.div className={styles.sign_up} variants={signUpVariants} initial='hidden' animate='visible'>
                            <span className="text-xl text-white">С возвращением!</span>
                            <Link to="/login" className={styles.link}>Войти</Link>
                        </motion.div>
                    </div>
                </form>
            </div>
        </FormProvider>
    );
}

export default SignUp;
