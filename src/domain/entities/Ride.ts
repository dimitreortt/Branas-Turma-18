import { Coords } from "./Coords"
import { UUID } from "./UUID"

export class Ride {
	private rideId: UUID
	private passengerId: UUID
	private driverId?: UUID
	private requestedAt: Date
	private status: string = "requested"
	private from: Coords
	private to: Coords

	constructor(rideId: string, passengerId: string, fromLat: number, fromLong: number, toLat: number, toLong: number, driverId?: string, status?: string) {
		this.rideId = new UUID(rideId)
		this.passengerId = new UUID(passengerId)
		if (driverId) this.driverId = new UUID(driverId)
		this.requestedAt = new Date()
		this.from = new Coords(fromLat, fromLong)
		this.to = new Coords(toLat, toLong)
		if (status) this.status = status
	}

	static create(passengerId: string, fromLat: number, fromLong: number, toLat: number, toLong: number, driverId?: string, status?: string) {
		const rideId = UUID.create()
		return new Ride(rideId.getValue(), passengerId, fromLat, fromLong, toLat, toLong, driverId, status)
	}

	getRideId() {
		return this.rideId.getValue()
	}

	getDriverId() {
		return this.driverId?.getValue()
	}

	getPassengerId() {
		return this.passengerId.getValue()
	}

	getRequestedAt() {
		return this.requestedAt
	}

	getStatus() {
		return this.status
	}

	getFrom() {
		return this.from
	}

	getTo() {
		return this.to
	}

	setStatus(status: string) {
		this.status = status
	}

	setDriverId(driverId: string) {
		this.driverId = new UUID(driverId)
	}
}
