import { Database } from "../../src/infra/database/Database"
import { newDb } from "pg-mem"
import { randomLat, randomLong, randomUUID } from "../unit/util/random"

export class DatabaseMock implements Database {
	pgp: any

	constructor() {}

	async build() {
		this.pgp = await newDb().adapters.createPgPromise()
		await this.pgp.connect()

		await this.pgp.query(`
            CREATE SCHEMA online_taxi;

            CREATE TABLE online_taxi.user (
                user_id uuid primary key,
                name text not null,
                cpf text not null,
                email text not null unique,
                car_plate text,
                user_type integer not null,
                password text,
                password_algorithm text
            );

            CREATE TABLE online_taxi.ride (
                ride_id uuid primary key,
                passenger_id uuid not null,
                driver_id uuid default null,
                status text not null,
                requested_at timestamp default now(),
                fare numeric,
                from_lat numeric,
                from_long numeric,
                to_lat numeric,
                to_long numeric,
                distance numeric
            );

            CREATE TABLE online_taxi.position (
                position_id uuid primary key,
                ride_id uuid not null,
                lat numeric not null,
                long numeric not null,
                date timestamp default now()
            );
        `)

		return this
	}

	async query(statement: string, params?: any): Promise<any[]> {
		return this.pgp.query(statement, params)
	}

	async addDummyUser1(email: string, userType: number = 1): Promise<DBOutput> {
		const result = await this.pgp.query("insert into online_taxi.user (user_id, name, email, cpf, car_plate, user_type) values ($1, $2, $3, $4, $5, $6) returning *", [randomUUID(), "John Doe1", email, "cpf1", "car_plate1", userType])
		return result[0]
	}

	async addFakeRide({ passengerId, driverId, rideId, status }: FakeRideInput = {}): Promise<DBOutput> {
		if (!rideId) rideId = randomUUID()
		if (!passengerId) passengerId = randomUUID()
		if (!status) status = 'requested'
		const result = await this.pgp.query("insert into online_taxi.ride (ride_id, passenger_id, driver_id, status, from_lat, from_long, to_lat, to_long) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *", [rideId, passengerId, driverId, status, randomLat(), randomLong(), randomLat(), randomLong()])
		return result[0]
	}
}

type DBOutput = {
	[key: string]: string
}

type DBOutputArray = [{
	[key: string]: string
}]

type FakeRideInput = {
	passengerId?: string
	driverId?: string
	rideId?: string
	status?: string
}
