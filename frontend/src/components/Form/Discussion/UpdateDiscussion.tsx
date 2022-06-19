// @ts-ignore
import React, {FC, useEffect, useState, useRef, startTransition} from 'react';
import {FormProvider, useForm} from "react-hook-form";
import {FormDiscussion} from "../../../types/form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {discussionSchema} from "../schema";
import styles from "./create-discussion.module.css"
import FormInput from "../Input/FormInput";
import FormFile from "../FileInput/FormFile";
import FormCheckbox from "../Checkbox/FormCheckbox";
import Checkbox from "../Checkbox/Checkbox";
import {createDiscussion, updateDiscussion} from "../../../requests/discussions";
import {useRecoilRefresher_UNSTABLE} from "recoil";
import {discussionsByUserSelector} from "../../../store/selectors/discussionsByUser";
import {all_discussionsSelector} from "../../../store/selectors/all_discussions";
import {Discussion} from "../../../types/discussion";


interface FormCreateDiscussionProps {
    clear: boolean
    discussion: Discussion
}

const UpdateDiscussion: FC<FormCreateDiscussionProps> = ({clear, discussion}) => {

    const methods = useForm<FormDiscussion>({mode:"onTouched",resolver: yupResolver(discussionSchema)});

    const [response, setResponse] = useState<any>(null)

    const refreshDiscussionsByUser = useRecoilRefresher_UNSTABLE(discussionsByUserSelector);
    const refreshAllDiscussion = useRecoilRefresher_UNSTABLE(all_discussionsSelector);

    const onSubmit = async (formData: FormDiscussion) => {
        const response = await updateDiscussion({...formData, id: discussion.id})
        console.log(response)
        setResponse(response)
        startTransition(() => {
            refreshDiscussionsByUser()
            refreshAllDiscussion()
        })
        methods.reset()
    };

    const [checkPass, setCheckPass] = useState<boolean>(discussion.password.length > 0)
    const [checkAnonym, setCheckAnonym] = useState<boolean>(discussion.anonymous)
    const cleaningForm = () => clear ? methods.reset() : ''

    useEffect(() => {
        cleaningForm()
    }, [clear])

    return (
        <FormProvider {...methods}>
            <div className={styles.container}>
                <header className={styles.header}>{response ? response?.message : 'Создание беседы'}</header>
                <form  onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className={styles.field_container}>
                        <div className="flex flex-col items-center w-[250px]">
                            <FormInput title="Название беседы" mock={discussion.title} registerName="title"/>
                            <FormInput title="Описание" mock={discussion.description} registerName="description"/>
                            {checkPass ? <FormInput title="Пароль"  type='password' registerName="password"/> : ''}
                            <FormFile title="Загрузить постер" registerName="poster"/>
                        </div>
                        <div className="w-[200px] flex flex-col items-center">
                            <Checkbox title="Пароль" checked={checkPass} setChecked={setCheckPass}/>
                            <FormCheckbox title="Анонимность" checked={checkAnonym} setChecked={setCheckAnonym} registerName="anonymous"/>
                        </div>

                    </div>
                    <footer className={styles.footer}>
                        <button type="submit" className={styles.btn}>Обновить</button>
                    </footer>
                </form>
            </div>
        </FormProvider>
    );
}

export default UpdateDiscussion;
