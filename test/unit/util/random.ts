import crypto from "crypto"

export const randomInt = () => {
	return Math.round(Math.random() * 10000)
}

export const randomEmail = () => {
	return `johndoe${Math.random()}@mail.com`
}

export const randomUUID = () => {
	return crypto.randomUUID()
}

export const randomLat = () => {
	return (Math.random() * 180 - 90) // Range: -90 to +90
}

export function randomLong() {
	return (Math.random() * 360 - 180) // Range: -180 to +180
}
