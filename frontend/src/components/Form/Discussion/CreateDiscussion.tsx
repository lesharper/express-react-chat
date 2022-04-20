import React, {FC, useEffect, useState, useRef} from 'react';
import {FormProvider, useForm} from "react-hook-form";
import {FormDiscussion} from "../../../types/form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {discussionSchema} from "../schema";
import styles from "./create-discussion.module.css"
import FormInput from "../Input/FormInput";
import FormFile from "../FileInput/FormFile";
import FormCheckbox from "../Checkbox/FormCheckbox";
import Checkbox from "../Checkbox/Checkbox";
import {createDiscussion} from "../../../requests/discussions";
import {Discussion} from "../../../types/discussion";


interface FormCreateDiscussionProps {
    clear: boolean
}
const CreateDiscussion: FC<FormCreateDiscussionProps> = ({clear}) => {

    const methods = useForm<FormDiscussion>({mode:"onTouched",resolver: yupResolver(discussionSchema)});

    const [response, setResponse] = useState<Discussion | undefined>()

    const onSubmit = async (formData: FormDiscussion) => {
        const response = await createDiscussion(formData)
        setResponse(response)
        methods.reset()
    };

    const [checkPass, setCheckPass] = useState<boolean>(false)
    const [checkAnonym, setCheckAnonym] = useState<boolean>(false)
    const cleaningForm = () => clear ? methods.reset() : ''
    useEffect(() => {
        cleaningForm()
    }, [clear])

    return (
        <FormProvider {...methods}>
            <div className={styles.container}>
                <header className={styles.header}>{response ? response : 'Создание беседы'}</header>
                <form  onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className={styles.field_container}>
                        <div className="w-[250px]">
                            <FormInput title="Название беседы" registerName="title"/>
                            <FormInput title="Описание" registerName="description"/>
                            {checkPass ? <FormInput title="Пароль" registerName="password"/> : ''}
                            <FormFile title="Загрузить постер" registerName="poster"/>
                        </div>
                        <div className="w-[200px] flex flex-col items-center">
                            <Checkbox title="Пароль" checked={checkPass} setChecked={setCheckPass}/>
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

export default CreateDiscussion;
