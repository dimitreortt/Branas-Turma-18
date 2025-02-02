import { UUID } from "./UUID"

export class Ride {
    private rideId: UUID
    private requestedAt: Date
    private status: string = 'requested'

    constructor(readonly passengerId: string) {
        this.requestedAt = new Date()
        this.rideId = UUID.create()
    }

    getRideId() {
        return this.rideId.getValue()
    }

    getRequestedAt() {
        return this.requestedAt
    }
    
    getStatus() {
        return this.status
    }
}
