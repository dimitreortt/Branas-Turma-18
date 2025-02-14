import { DistanceCalculator } from "../service/DistanceCalculator"
import { FareCalculator } from "../service/FareCalculator"
import { Coords } from "../vo/Coords"
import { Position } from "../vo/Position"
import { RequestedStatus, RideStatus, RideStatusFactory } from "../vo/RideStatus"
import { UUID } from "../vo/UUID"

export class Ride {
	private rideId: UUID
	private passengerId: UUID
	private driverId?: UUID
	private requestedAt: Date
	private status: RideStatus = new RequestedStatus()
	private from: Coords
	private to: Coords
	private fare?: number
	private distance?: number

	constructor(rideId: string, passengerId: string, fromLat: number, fromLong: number, toLat: number, toLong: number, driverId?: string, status?: string, fare?: number, distance?: number) {
		this.rideId = new UUID(rideId)
		this.passengerId = new UUID(passengerId)
		if (driverId) this.driverId = new UUID(driverId)
		this.requestedAt = new Date()
		this.from = new Coords(fromLat, fromLong)
		this.to = new Coords(toLat, toLong)
		if (status) this.status = RideStatusFactory.create(status)
        this.fare = fare
        this.distance = distance
	}

	static create(passengerId: string, fromLat: number, fromLong: number, toLat: number, toLong: number, driverId?: string, status?: string) {
		const rideId = UUID.create()
		return new Ride(rideId.getValue(), passengerId, fromLat, fromLong, toLat, toLong, driverId, status)
	}

    accept(driverId: string) {
        this.status = this.status.accept()
        this.driverId = new UUID(driverId)
    }

    start() {
        this.status = this.status.start()
    }

    complete(positions: Position[]) {
        this.status = this.status.complete()
        this.distance = this.calculateDistance(positions)
        this.fare = FareCalculator.calculate(this.distance)
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
		return this.status.value
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

    calculateDistance(positions: Position[]) {
        let distance = 0
        for (const [index, position] of positions.entries()) {
            const nextPosition = positions[index + 1]
            if (!nextPosition) continue
            distance += DistanceCalculator.calculate(position.getCoords(), nextPosition.getCoords())
        }
        return distance
    }

    getFare() {
        return this.fare
    }

    getDistance() {
        return this.distance
    }
}
