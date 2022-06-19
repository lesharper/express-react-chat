
export interface Message {
    id?: number
    user_id: number
    username: string
    email: string
    avatar: string
    message: string
    date_send: string
    server?:boolean
}
