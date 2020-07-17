import "reflect-metadata";
import * as helmet from "helmet";
import * as bodyParser from "body-parser";
import { container } from "../../ioc/ioc-container";
import { InversifyExpressServer } from "inversify-express-utils";
import "./controllers/UserController";

class Server {
  server;
  constructor() {
    this.server = new InversifyExpressServer(container);
  }
  start(): void {
    this.server.setConfig((app) => {
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      app.use(helmet());
    });

    const application = this.server.build();

    const port = parseInt(process.env.PORT, 10) || 6000;

    application.listen(port, () => {
      console.log(`🆗 Server started on port ${port}`);
    });
  }
}

export default Server;
