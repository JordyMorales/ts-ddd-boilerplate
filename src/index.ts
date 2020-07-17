require("dotenv").config();
import bootstrap from "./infrastructure/config/bootstrap";

// import Server from "./infrastructure/presentation/RestAPI/server";
import Server from './infrastructure/presentation/GraphqlAPI/server'

const start = async () => {
  try {
    await bootstrap.init();

    const server = new Server();
    await server.start();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
