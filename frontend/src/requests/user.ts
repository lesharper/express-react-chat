import axios from 'axios'
import {FormLogin, FormProfile, FormRegistration} from "../types/form";
import {User} from "../types/user";
import {BASE_URL} from "../constants";

axios.defaults.withCredentials = true;

export const signUp = async (data: FormRegistration)  => {
    try {
        const formData = new FormData()
        formData.append('username', data.username)
        formData.append('email', data.email)
        formData.append('password', String(data.password))
        formData.append('avatar', data.avatar[0])

        const response = await axios.post(`${BASE_URL}/api/user/registration`, formData)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const signIn = async (data: FormLogin) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/user/login`, data)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const check = async () => {
    const response = await axios.get(`${BASE_URL}/api/user/check`)
    return response.data
}

export const logout = async () => {
    const response = await axios.get(`${BASE_URL}/api/user/logout`)
    return response.data
}

export const updateUser = async (data: FormProfile) => {
    try {
        const formData = new FormData()
        formData.append('username', data.username)
        formData.append('email', data.email)
        formData.append('password', String(data.password))
        formData.append('avatar', data.avatar[0])

        const response = await axios.put(`${BASE_URL}/api/user/update`, formData)
        return response.data
    } catch (err) {
        console.log(err)
    }
}


