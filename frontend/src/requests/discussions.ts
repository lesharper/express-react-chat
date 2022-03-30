import axios from 'axios'
import {Discussion} from "../types/discussion";
import {FormDiscussion} from "../types/form";
import {BASE_URL} from "../constants"

axios.defaults.withCredentials = true;

export const createDiscussion = async (data: FormDiscussion) => {
    try {
        console.log(data)
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('anonymous', String(data.anonymous))
        formData.append('password', String(data.password ?? ''))
        formData.append('poster', data.poster[0])

        const response = await axios.post<Discussion>(`${BASE_URL}/discussions`, formData)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const getAllDiscussions = async () => {
    try {
        const response = await axios.get<Discussion[]>(`${BASE_URL}/discussions`)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

