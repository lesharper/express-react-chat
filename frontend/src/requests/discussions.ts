import axios from 'axios'
import {Discussion} from "../types/discussion";
import {FormDiscussion} from "../types/form";
import {BASE_URL} from "../constants"

axios.defaults.withCredentials = true;

export const createDiscussion = async (data: FormDiscussion) => {
    try {
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('anonymous', String(data.anonymous))
        formData.append('password', String(data.password ?? ''))
        formData.append('poster', data.poster[0])

        const response = await axios.post(`${BASE_URL}/api/discussion/add`, formData)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const updateDiscussion = async (data: any) => {
    try {
        const formData = new FormData()
        formData.append('id', data.id)
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('anonymous', String(data.anonymous))
        formData.append('password', String(data.password ?? ''))
        formData.append('poster', data.poster[0])

        const response = await axios.put(`${BASE_URL}/api/discussion/update`, formData)
        return response.data
    } catch (err) {
        console.log(err)
    }
}


export const getAllDiscussionsByUser = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/discussion/byUser`)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const getAllUserByDiscussion = async (id: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/discussion/byDiscussion/${id}`)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const getAllDiscussions = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/discussion/all`)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

