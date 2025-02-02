import { DatabaseI } from "../database/Database";
import { User } from "../../domain/entities/User";

export interface UserRepositoryI {
    save(user: User): Promise<any>
}

export class UserRepository implements UserRepositoryI {
    constructor(private database: DatabaseI) {}

    async save(user: User): Promise<number> {
        const [{ user_id }] = await this.database.query('insert into online_taxi.user (user_id, name, email, cpf, car_plate, user_type) values ($1, $2, $3, $4, $5, $6) returning user_id', [user.getUserId(), user.getName(), user.getEmail(), user.getCpf(), user.getCarPlate(), user.userType]);

        return user_id
    }
}

