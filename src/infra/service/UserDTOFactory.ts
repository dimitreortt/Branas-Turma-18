import { UserDTO } from "../../domain/dto/UserDTO";

export class UserDTOFactory {
    constructor() { }

    static fromDbResult(result: any) {
        const { user_id, name, email, cpf, car_plate, user_type } = result[0]
        return new UserDTO(user_id, name, cpf, email, car_plate, user_type);
    } 
}
