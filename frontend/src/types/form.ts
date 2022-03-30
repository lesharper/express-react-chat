export interface FormRegistration {
    readonly  username: string
    readonly  email: string
    readonly  password: string
    readonly  avatar: FileList
}

export interface FormDiscussion {
    readonly title: string
    readonly password?:string
    readonly anonymous?:boolean
    readonly description: string
    readonly poster: FileList
}

export type FormLogin = Omit<FormRegistration, 'username' | 'avatar'>

export type FormProfile = FormRegistration

export enum Icons {
    username,
    email,
    password
}
