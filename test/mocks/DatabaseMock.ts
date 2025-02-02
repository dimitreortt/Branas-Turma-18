import { Database } from "../../src/infra/database/Database";
import { newDb } from 'pg-mem';

export class DatabaseMock implements Database {
    pgp: any

    constructor() {
    }

    async build() {
        this.pgp = await newDb().adapters.createPgPromise();
        await this.pgp.connect();

        await this.pgp.query(`
            CREATE SCHEMA online_taxi;

            CREATE TABLE online_taxi.user (
                id serial primary key,
                name text not null,
                cpf text not null,
                email text not null unique,
                car_plate text,
                user_type integer not null
            );
        `)

        return this
    }

    async query(statement: string, params?: any): Promise<any> {
        return this.pgp.query(statement, params)
    }

    async addDummyUser1(email: string): Promise<any>  {
        const result = await this.pgp.query('insert into online_taxi.user (name, email, cpf, car_plate, user_type) values ($1, $2, $3, $4, $5) returning *', ['John Doe1', email, 'cpf1', 'car_plate1', 1])
        return result[0]
    }
}
