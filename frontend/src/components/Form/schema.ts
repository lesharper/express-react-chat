import * as Yup from "yup";

export const registrationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Имя обязательно')
        .min(5, 'Не менее пяти символов')
        .max(25, 'Не более двадцати пяти символов'),
    email: Yup.string()
        .required('Почта обязательна')
        .email('Некорректная почта'),
    password: Yup.string()
        .required('Пароль обязателен')
        .min(5, 'Не менее пяти символов'),
    avatar: Yup.mixed()
        .required()
})

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .required('Почта обязательна')
        .email('Некорректная почта'),
    password: Yup.string()
        .required('Пароль обязателен')
        .min(5, 'Не менее пяти символов'),
})

export const discussionSchema = Yup.object().shape({
    title: Yup.string()
        .required('Название обязательно')
        .min(3, 'Не менее трех символов'),
    password: Yup.string(),
    anonymous: Yup.boolean(),
    description: Yup.string()
        .required('Описание обязательно')
        .min(10, 'Не менее десяти символов'),
    poster: Yup.mixed()
        .required()
})

export const profileSchema = registrationSchema
