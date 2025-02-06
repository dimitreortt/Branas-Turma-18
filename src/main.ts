import { UserController } from "./infra/controller/UserController";
import { Registry } from "./infra/di/Registry";
import { ExpressAdapter } from "./infra/http/HttpServer";

const httpServer = new ExpressAdapter()

Registry.getInstance().provide('httpServer', httpServer)
Registry.getInstance().provide('userController', new UserController())

httpServer.listen(3000)