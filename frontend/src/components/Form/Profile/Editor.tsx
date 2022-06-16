import React, {FC, useState} from 'react';
import {FormProvider, useForm} from "react-hook-form";
import {FormProfile} from "../../../types/form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {profileSchema} from "../schema";
import styles from "./profile-editor.module.css";
import FormInput from "../Input/FormInput";
import FormFile from "../FileInput/FormFile";
import {User} from "../../../types/user";
import {BASE_URL} from "../../../constants";
import {updateUser} from "../../../requests/user";
import {useSetRecoilState} from "recoil";
import {userAtom} from "../../../store/atoms/user";

interface EditorProps {
    mock: User | undefined
}

const Editor: FC<EditorProps> = ({mock}) => {
    const [disabled, setDissabled] = useState(true)
    const [response, setResponse] = useState(null)
    const setUser = useSetRecoilState(userAtom)
    const methods = useForm<FormProfile>({mode: "onTouched", resolver: yupResolver(profileSchema)});

    const onSubmit = async (formData: FormProfile) => {
        const response = await updateUser(formData)
        console.log(response)
        if (response.hasOwnProperty('error')) setResponse(response.error)
        else setUser(response)
    };

    const disabledHandler = () => setDissabled(false)
    return (
        <FormProvider {...methods}>
            <div className={styles.container}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className={styles.profile}>
                        <img src={`${BASE_URL}/${mock?.avatar}`} alt="avatar" className={styles.avatar}/>
                        <FormInput mock={mock?.username} title="Имя пользователя" registerName="username"
                                   disabled={disabled}/>
                        <FormInput mock={mock?.email} title="Почта" registerName="email" disabled={disabled}/>
                        <FormInput title="Пароль" registerName="password" disabled={disabled}/>
                        <FormFile title="Изменить аватар" registerName="avatar" disabled={disabled}/>
                        <div className={styles.footer}>
                            {
                                disabled
                                    ? <button className={styles.btn} onClick={disabledHandler}>Изменить</button>
                                    : <button type="submit" className={styles.btn}>Отправить</button>
                            }
                        </div>
                        {response && <span className="text-red-500">{response}</span>}
                    </div>
                </form>
            </div>
        </FormProvider>
    );
}

export default Editor;
