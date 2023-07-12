import { ClientProviderOptions, Transport } from "@nestjs/microservices";
import { SERVER_HOST, SERVER_PORT } from "./env";

export const ServerConfigSymbol = Symbol.for('serverConfig');

export const serverConfig: ClientProviderOptions = {
  name: ServerConfigSymbol,
  transport: Transport.TCP,
  options: {
    host: SERVER_HOST,
    port: Number(SERVER_PORT),
  }
}

console.log({ serverConfig });

export default serverConfig;
