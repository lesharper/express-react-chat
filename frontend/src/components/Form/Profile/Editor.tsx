import React, {FC} from 'react';
import {FormProvider, useForm} from "react-hook-form";
import {FormProfile} from "../../../types/form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {profileSchema} from "../schema";
import styles from "./profile-editor.module.css";
import FormInput from "../Input/FormInput";
import FormFile from "../FileInput/FormFile";
import {Icons} from "../../../types/form"

const Editor: FC = () => {
    const methods = useForm<FormProfile>({mode: "onTouched", resolver: yupResolver(profileSchema)});

    const onSubmit = (formData: FormProfile) => console.log(formData);

    return (
        <FormProvider {...methods}>
            <div className={styles.container}>

                <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.profile}>
                        <header className={styles.title}>Профиль</header>
                        <FormInput icon={Icons.username} title="Имя пользователя" registerName="username"/>
                        <FormInput icon={Icons.email} title="Почта" registerName="email"/>
                        <FormInput icon={Icons.password} title="Пароль" registerName="password"/>
                        <div className="ml-10 my-2">
                            <FormFile title="Изменить аватар" registerName="avatar"/>
                        </div>
                        <div className={styles.footer}>
                            <button type="submit" className={styles.btn}>Изменить</button>
                        </div>
                    </div>
                </form>
            </div>
        </FormProvider>
    );
}

export default Editor;
