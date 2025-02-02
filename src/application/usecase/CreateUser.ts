import { UserDAOI } from "../../domain/dao/UserDAOI";
import { User } from "../../domain/entities/User";
import { UserRepositoryI } from "../../infra/repository/UserRepository";
import { CreateUserInput } from "../dto/CreateUserInput";
import { CreateUserOutput } from "../dto/CreateUserOutput";

export class CreateUser {
    constructor(private userDao: UserDAOI, private userRepository: UserRepositoryI) { }

    async execute(input: CreateUserInput): Promise<CreateUserOutput> {
        const { name, email, cpf, carPlate, userType } = input;

        const existingUser = await this.userDao.getUserByEmail(email)
        if (existingUser) {
            throw new Error('Email already being used')
        }

        const user = new User(name, email, cpf, carPlate, userType);
        const [{ id }] = await this.userRepository.save(user);
        return new CreateUserOutput(id)
    }
}
