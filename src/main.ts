import { DatabaseMock } from "../test/mocks/DatabaseMock";
import { GetUser } from "./application/query/GetUser";
import { CreateUser } from "./application/usecase/CreateUser";
import GenerateInvoice from "./application/usecase/GenerateInvoice";
import ProcessPayment from "./application/usecase/ProcessPayment";
import { UserController } from "./infra/controller/UserController";
import { UserDAO } from "./infra/dao/UserDAO";
import { Registry } from "./infra/di/Registry";
import { ExpressAdapter } from "./infra/http/HttpServer";
import { Mediator } from "./infra/mediator/Mediator";
import { UserRepository } from "./infra/repository/UserRepository";

const httpServer = new ExpressAdapter()
const processPayment = new ProcessPayment();
const generateInvoice = new GenerateInvoice();
const mediator = new Mediator();
mediator.register('rideCompleted', async (event: any) => {
    await processPayment.execute(event);
    await generateInvoice.execute(event);
})

new DatabaseMock().build().then((database) => {
    Registry.getInstance().provide('database', database)
})
Registry.getInstance().provide('mediator', mediator)
Registry.getInstance().provide('httpServer', httpServer)
Registry.getInstance().provide('userDao', new UserDAO())
Registry.getInstance().provide('userRepository', new UserRepository())
Registry.getInstance().provide('getUser', new GetUser())
Registry.getInstance().provide('signUp', new CreateUser())
Registry.getInstance().provide('userController', new UserController())

httpServer.listen(3000)