import React, {FC, useState} from 'react';
import {FormProvider, useForm} from "react-hook-form";
import {FormProfile} from "../../../types/form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {profileSchema} from "../schema";
import styles from "./profile-editor.module.css";
import FormInput from "../Input/FormInput";
import FormFile from "../FileInput/FormFile";
import {Icons} from "../../../types/form"
import {User} from "../../../types/user";
import {BASE_URL} from "../../../constants";

interface EditorProps {
    mock: User | undefined
}
const Editor: FC<EditorProps> = ({mock}) => {
    const [disabled, setDissabled] = useState(true)

    const methods = useForm<FormProfile>({mode: "onTouched", resolver: yupResolver(profileSchema)});

    const onSubmit = (formData: FormProfile) => console.log(formData);

    const disabledHandler = () => setDissabled(false)
    return (
        <FormProvider {...methods}>
            <div className={styles.container}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className={styles.profile}>
                        <img src={`${BASE_URL}/${mock?.avatar}`} alt="avatar" className={styles.avatar}/>
                        <FormInput icon={Icons.username} mock={mock?.username} title="Имя пользователя" registerName="username" disabled={disabled}/>
                        <FormInput icon={Icons.email} mock={mock?.email} title="Почта" registerName="email" disabled={disabled}/>
                        {/*<FormInput icon={Icons.password} title="Пароль" registerName="password"/>*/}
                        <div className="ml-10 my-2">
                            <FormFile title="Изменить аватар" registerName="avatar"/>
                        </div>
                        <div className={styles.footer}>
                            {
                                disabled
                                    ? <button className={styles.btn} onClick={disabledHandler}>Изменить</button>
                                    : <button type="submit" className={styles.btn}>Отправить</button>
                            }

                        </div>
                    </div>
                </form>
            </div>
        </FormProvider>
    );
}

export default Editor;
