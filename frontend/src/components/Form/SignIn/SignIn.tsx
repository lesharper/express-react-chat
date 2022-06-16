import React, {FC, useState} from 'react';
import styles from "./sign-in.module.css"
import {motion} from "framer-motion"
import {useForm, FormProvider} from "react-hook-form";
import {FormLogin, FormRegistration} from "../../../types/form"
import {yupResolver} from '@hookform/resolvers/yup';
import {loginSchema} from "../schema"
import FormInput from "../Input/FormInput";
import {Link, useNavigate} from "react-router-dom"
import {signIn} from "../../../requests/user";
import {useSetRecoilState} from "recoil";
import {userAtom} from "../../../store/atoms/user";

const SignIn: FC = () => {

    const navigate = useNavigate()
    const methods = useForm<FormLogin>({mode: "onTouched", resolver: yupResolver(loginSchema)});
    const setUser = useSetRecoilState(userAtom)
    const [response, setResponse] = useState(null)

    const onSubmit = async (formData: FormLogin) => {
        const response = await signIn(formData)
        if (response.hasOwnProperty('error'))
            setResponse(response.error)
        else {
            setUser(response)
            navigate('/')
        }

        methods.reset()
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
                        <motion.div className={styles.sign_up} variants={signUpVariants} initial='hidden'
                                    animate='visible'>
                            <span className="text-xl text-white">Добро пожаловать в Nchat!</span>
                            <Link to="/registration" className={styles.link}>Создать аккаунт</Link>
                        </motion.div>
                        <motion.div className={styles.sign_in} variants={signInVariants} initial='hidden'
                                    animate='visible'>
                            <header className={styles.title}>Авторизация</header>
                            <FormInput title="Почта" registerName="email"/>
                            <FormInput title="Пароль" registerName="password" type="password"/>
                            <div className={styles.footer}>
                                <button type="submit" className={styles.btn}>Войти</button>
                            </div>
                            {response && <span className="text-red-500">{response}</span>}
                        </motion.div>
                    </div>
                </form>
            </div>
        </FormProvider>
    );
}

export default SignIn;
