export class Coords {
    constructor(private lat: number, private long: number) {
        if (lat < -90 || lat > 90) throw new Error('Invalid latitude')
        if (long < -180 || long > 180) throw new Error('Invalid longitude')
    }

    getLat() {
        return this.lat
    }

    getLong() {
        return this.long
    }
}
