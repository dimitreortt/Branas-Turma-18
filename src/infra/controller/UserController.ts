import { GetUser } from "../../application/query/GetUser";
import { CreateUser } from "../../application/usecase/CreateUser";
import { inject } from "../di/Registry";
import HttpServer from "../http/HttpServer";

export class UserController {
    @inject('httpServer')
    private httpServer?: HttpServer;
    @inject('signUp')
    private signUp?: CreateUser;
    @inject('getUser')
    private getUser?: GetUser;

    constructor() {
        this.httpServer?.register('post', '/SignUp', async (params: any, body: any) => {
            const input = body
            const output = await this.signUp?.execute(input);
            return output;
        })

        this.httpServer?.register('get', '/users/:userId', async (params: any, body: any) => {
            const input = { email: body.email }
            const output = await this.getUser?.execute(input)
            return output
        })
    }
}
