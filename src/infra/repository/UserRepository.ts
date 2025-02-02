import { DatabaseI } from "../database/Database";
import { User } from "../../domain/entities/User";

export interface UserRepositoryI {
    save(user: User): Promise<any>
}

export class UserRepository implements UserRepositoryI {
    constructor(private database: DatabaseI) {}

    async save(user: User): Promise<any> {
        return this.database.query('insert into online_taxi.user (name, email, cpf, car_plate, user_type) values ($1, $2, $3, $4, $5) returning id', [user.name, user.email, user.cpf, user.carPlate, user.userType]);
    }
}

