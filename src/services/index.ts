import axios from 'axios'

export const get = <T>(url: string) => async (): Promise<T | null> => {
  try {
    let response = await axios.get(url)
    return response.data
  } catch (e) {
    console.log('[get url]: ', e)
    return Promise.resolve(null)
  }
}

export const post = <T>(url: string) => async (body: T) => {
  try {
    let response = await axios.post(url, body)
    return response.data
  } catch (e) {
    console.log(e.message)
    return null
  }
}

export const put = <T>(url: string) => async ({
  id,
  body,
}: {
  id: string
  body: Partial<T>
}) => {
  try {
    let response = await axios.patch(`${url}/${id}`, body, {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
    })
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
