import { UserDTO } from "../../domain/dto/UserDTO";

export class GetUserOutput {
    constructor(readonly user: UserDTO) { }
}
