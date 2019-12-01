export const ENTER = 'Enter'
export const ESCAPE_KEY = 27
export const ENTER_KEY = 13

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = (Math.random() * 16) | 0
    let v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
