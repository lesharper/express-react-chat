import React, {FC, useEffect, useState} from 'react';
import {FormProvider, useForm} from "react-hook-form";
import {FormDiscussion} from "../../../types/form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {discussionSchema} from "../schema";
import styles from "./create-discussion.module.css"
import FormInput from "../Input/FormInput";
import FormFile from "../FileInput/FormFile";
import FormCheckbox from "../Checkbox/FormCheckbox";

interface FormCreateDiscussionProps {
    clear: boolean
}
const FormCreateDiscussion: FC<FormCreateDiscussionProps> = ({clear}) => {

    const methods = useForm<FormDiscussion>({mode:"onTouched",resolver: yupResolver(discussionSchema)});

    const onSubmit = (formData: FormDiscussion) => console.log(formData);

    const [checkPass, setCheckPass] = useState<boolean>(false)
    const [checkAnonym, setCheckAnonym] = useState<boolean>(false)
    const cleaningForm = () => clear ? methods.reset() : ''
    useEffect(() => {
        cleaningForm()
    }, [clear])
    return (
        <FormProvider {...methods}>
            <div className={styles.container}>
                <header className={styles.header}>Создание беседы</header>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className={styles.field_container}>
                        <div className="w-[250px]">
                            <FormInput title="Название беседы" registerName="title"/>
                            <FormInput title="Описание" registerName="description"/>
                            {checkPass ? <FormInput title="Пароль" registerName="password"/> : ''}
                            <FormFile title="Загрузить постер" registerName="poster"/>
                        </div>
                        <div className="w-[200px] flex flex-col items-center">
                            <FormCheckbox title="Пароль" checked={checkPass} setChecked={setCheckPass} registerName="password"/>
                            <FormCheckbox title="Анонимность" checked={checkAnonym} setChecked={setCheckAnonym} registerName="anonymous"/>
                        </div>

                    </div>
                    <footer className={styles.footer}>
                        <button type="submit" className={styles.btn}>Отправить</button>
                    </footer>
                </form>
            </div>
        </FormProvider>
    );
}

export default FormCreateDiscussion;
