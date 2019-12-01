import axios from 'axios'

export const post = (url: string) => async <T>(body: T) => {
  try {
    let response = await axios.post(url, body)
    return response.data
  } catch (e) {
    console.log(e.message)
    return null
  }
}

export const patch = (url: string) => async <T>(
  id: string,
  body: Partial<T>
) => {
  try {
    let response = await axios.patch(`${url}/${id}`, body)
    return response.data
  } catch (e) {
    console.log(e.message)
    return null
  }
}

export const xdelete = (url: string) => async (id: string) => {
  try {
    return axios.delete(`${url}/${id}`)
  } catch (e) {
    console.log(e.message)
    return null
  }
}
