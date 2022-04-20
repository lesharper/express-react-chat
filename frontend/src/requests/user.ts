import axios from 'axios'
import {FormLogin, FormRegistration} from "../types/form";
import {$authHost, $host} from "./index"
import jwtDecode from "jwt-decode";
import {useSetRecoilState} from "recoil";
import {userAtom} from "../store/atoms";
import {User} from "../types/user";

axios.defaults.withCredentials = true;

export const signUp = async (data: FormRegistration): Promise<User | undefined>  => {
    try {
        const formData = new FormData()
        formData.append('username', data.username)
        formData.append('email', data.email)
        formData.append('password', String(data.password))
        formData.append('avatar', data.avatar[0])

        const response = await $host.post(`/auth/registration`, formData)
        localStorage.setItem('token', response.data.token)
        return jwtDecode(response.data.token)
    } catch (err) {
        console.log(err)
    }
}

export const signIn = async (data: FormLogin): Promise<User | undefined> => {
    try {
        const response = await $host.post(`/auth/login`, data)
        localStorage.setItem('token', response.data.token)
        return jwtDecode(response.data.token)
    } catch (err) {
        console.log(err)
    }
}

export const check = async (): Promise<User> => {
    const response = await $authHost.get(`/auth/check`)
    localStorage.setItem('token', response.data.token)
    return jwtDecode(response.data.token)
}



