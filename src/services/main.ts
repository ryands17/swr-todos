import axios from 'axios'
import { baseUrl } from 'config/env'

export const post = async <T>(body: T) => {
  try {
    let response = await axios.post(`${baseUrl}/todos`, body)
    return response.data
  } catch (e) {
    console.log(e.message)
  }
}

export const patch = async <T>(id: string, body: Partial<T>) => {
  try {
    let response = await axios.patch(`${baseUrl}/todos/${id}`, body)
    return response.data
  } catch (e) {
    console.log(e.message)
  }
}

export const xdelete = async (id: string) => {
  try {
    return axios.delete(`${baseUrl}/todos/${id}`)
  } catch (e) {
    console.log(e.message)
  }
}
