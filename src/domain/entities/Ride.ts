import { Mediator } from "../../infra/mediator/Mediator"
import { RideCompletedEvent } from "../event/RideCompletedEvent"
import { DistanceCalculator } from "../service/DistanceCalculator"
import { FareCalculator, FareCalculatorFactory } from "../service/FareCalculator"
import { Coords } from "../vo/Coords"
import { Position } from "../vo/Position"
import { RequestedStatus, RideStatus, RideStatusFactory } from "../vo/RideStatus"
import { UUID } from "../vo/UUID"

export class Ride extends Mediator {
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
		super()
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
		this.distance = 0
		this.fare = 0
		for (const [index, position] of positions.entries()) {
			const nextPosition = positions[index + 1]
			if (!nextPosition) continue
			const distance = DistanceCalculator.calculate(position.getCoords(), nextPosition.getCoords())
			this.distance += distance
			this.fare += FareCalculatorFactory.create(new Date()).calculate(distance)
		}
		this.status = this.status.complete()
		const event = new RideCompletedEvent(this.getRideId(), this.fare)
		this.notify(RideCompletedEvent.eventName, event)
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

	getFare() {
		return this.fare
	}

	getDistance() {
		return this.distance
	}
}
