import React, {FC, useState} from 'react';
import {FormProvider, useForm} from "react-hook-form";
import {FormRegistration} from "../../../types/form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {registrationSchema} from "../schema";
import styles from "./sign-up.module.css";
import {motion} from "framer-motion"
import FormInput from "../Input/FormInput";
import {Link, useNavigate} from "react-router-dom";
import FormFile from "../FileInput/FormFile";
import {signUp} from "../../../requests/user";
import {useSetRecoilState} from "recoil";
import {userAtom} from "../../../store/atoms/user";

const SignUp: FC = () => {

    const navigate = useNavigate()
    const methods = useForm<FormRegistration>({mode: "onTouched", resolver: yupResolver(registrationSchema)});
    const setUser = useSetRecoilState(userAtom)

    const [response, setResponse] = useState(null)
    const onSubmit = async (formData: FormRegistration) => {
        const response = await signUp(formData)
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
                        <motion.div className={styles.sign_in} variants={signInVariants} initial='hidden'
                                    animate='visible'>
                            <header className={styles.title}>Регистрация</header>
                            <FormInput title="Имя пользователя" registerName="username"/>
                            <FormInput title="Почта" registerName="email"/>
                            <FormInput title="Пароль" registerName="password" type="password"/>
                            <FormFile title="Загрузить аватар" registerName="avatar"/>
                            <div className={styles.footer}>
                                <button type="submit" className={styles.btn}>Создать</button>
                            </div>
                            {response && <span className="text-red-500">{response}</span>}
                        </motion.div>
                        <motion.div className={styles.sign_up} variants={signUpVariants} initial='hidden'
                                    animate='visible'>
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
