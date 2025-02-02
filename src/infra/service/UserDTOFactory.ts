import { UserDTO } from "../../domain/dto/UserDTO";

export class UserDTOFactory {
    constructor() { }

    static fromDbResult(result: any) {
        const { name, email, cpf, car_plate, user_type, id } = result[0]
        return new UserDTO(id, name, cpf, email, car_plate, user_type);
    } 
}
