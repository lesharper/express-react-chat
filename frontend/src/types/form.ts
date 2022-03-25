export interface FormRegistration {
    username: string
    email: string
    password: string
    avatar: object
}

export interface FormDiscussion {
    title: string
    password?:string
    anonymous?:boolean
    description: string
    poster: object
}

export type FormLogin = Omit<FormRegistration, "username" | "avatar">

export enum Icons {
    username,
    email,
    password
}
