import { Coords } from "../vo/Coords"
import { UUID } from "../vo/UUID"

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

    accept(driverId: string) {
        this.status = "accepted"
        this.driverId = new UUID(driverId)
    }

    start() {
        if (this.status !== "accepted") {
            throw new Error("Ride is not accepted")
        }
        this.status = 'in_progress'
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

	setDriverId(driverId: string) {
		this.driverId = new UUID(driverId)
	}
}
