import crypto from 'crypto'

export const randomInt = () => {
    return Math.round(Math.random() * 10000)
}

export const randomEmail = () => {
    return `johndoe${Math.random()}@mail.com`
}

export const randomUUID = () => {
    return crypto.randomUUID()
}