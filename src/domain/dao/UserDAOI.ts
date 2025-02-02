import { UserDTO } from "../dto/UserDTO";

export interface UserDAOI {
    getUserByEmail(email: string): Promise<UserDTO | null>
}
