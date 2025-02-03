export class RequestRideInput {
    constructor(
        readonly passengerId: string,
        readonly fromLat: number,
        readonly fromLong: number,
        readonly toLat: number,
        readonly toLong: number
    ) {}
}
