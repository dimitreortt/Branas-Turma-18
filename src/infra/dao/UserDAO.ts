import { UserDAOI } from "../../domain/dao/UserDAOI";
import { UserDTO } from "../../domain/dto/UserDTO";
import { DatabaseI } from "../database/Database";
import { inject } from "../di/Registry";
import { UserDTOFactory } from "../service/UserDTOFactory";

export class UserDAO implements UserDAOI {
    @inject('database')
    private database?: DatabaseI

    constructor() {}

    async getUserByEmail(email: string): Promise<UserDTO | null> {
        const result = await this.database?.query('select * from online_taxi.user where email = $1', [email]);
        if (result?.length === 0) {
            return null;
        }
        return UserDTOFactory.fromDbResult(result)
    }

    async getUserById(id: string): Promise<UserDTO | null> {
        const result = await this.database?.query('select * from online_taxi.user where user_id = $1', [id])
        if (result?.length === 0) {
            return null;
        }
        return UserDTOFactory.fromDbResult(result)
    }
}
