import { Coords } from "./Coords"
import { UUID } from "./UUID"

export class Ride {
    private rideId: UUID
    private passengerId: UUID
    private requestedAt: Date
    private status: string = 'requested'
    private from: Coords
    private to: Coords

    constructor(passengerId: string, fromLat: number, fromLong: number, toLat: number, toLong: number) {
        this.passengerId = new UUID(passengerId)
        this.requestedAt = new Date()
        this.rideId = UUID.create()
        this.from = new Coords(fromLat, fromLong)
        this.to = new Coords(toLat, toLong)
    }

    getRideId() {
        return this.rideId.getValue()
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
}
