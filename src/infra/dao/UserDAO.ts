import { UserDAOI } from "../../domain/dao/UserDAOI";
import { UserDTO } from "../../domain/dto/UserDTO";
import { DatabaseI } from "../database/Database";
import { UserDTOFactory } from "../service/UserDTOFactory";

export class UserDAO implements UserDAOI {
    constructor(private database: DatabaseI) {}

    async getUserByEmail(email: string): Promise<UserDTO | null> {
        const result = await this.database.query('select * from online_taxi.user where email = $1', [email]);
        if (result.length === 0) {
            return null;
        }
        return UserDTOFactory.fromDbResult(result)
    }
}
