import { Coords } from "./Coords";
import { UUID } from "./UUID";

export class Position {
    private positionId: UUID
    private rideId: UUID
    private coords: Coords

    constructor(positionId: string, rideId: string, private lat: number, private long: number, private date: Date) {
        this.positionId = new UUID(positionId);
        this.rideId = new UUID(rideId);
        this.coords = new Coords(lat, long);
    }

    static create(rideId: string, lat: number, long: number, date: Date) {
        const positionId = UUID.create()
        return new Position(positionId.getValue(), rideId, lat, long, date);
    }

    getCoords() {
        return this.coords;
    }

    getDate() {
        return this.date;
    }

    getPositionId() {
        return this.positionId.getValue();
    }

    getRideId() {
        return this.rideId.getValue();
    }
}
