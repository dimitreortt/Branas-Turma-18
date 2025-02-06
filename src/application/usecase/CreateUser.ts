import { UserDAOI } from "../../domain/dao/UserDAOI";
import { User } from "../../domain/entities/User";
import { UserRepositoryI } from "../../infra/repository/UserRepository";
import { CreateUserInput } from "../dto/CreateUserInput";
import { CreateUserOutput } from "../dto/CreateUserOutput";
import { inject } from "../../infra/di/Registry";

export class CreateUser {
    @inject('userDao')
    private userDao?: UserDAOI;
    @inject('userRepository')
    private userRepository?: UserRepositoryI;

    constructor() { }

    async execute(input: CreateUserInput): Promise<CreateUserOutput> {
        const { name, email, cpf, carPlate, userType } = input;
        const existingUser = await this.userDao?.getUserByEmail(email)
        if (existingUser) {
            throw new Error('Email already being used')
        }
        console.log('aqui')
        const user = User.create(name, email, cpf, carPlate, userType);
        const userId = await this.userRepository?.save(user);
        return new CreateUserOutput(userId)
    }
}