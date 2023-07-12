import * as dotenv from 'dotenv';

dotenv.config();

export enum EnvironmentNames {
  local = 'local',
  develop = 'develop',
  staging = 'staging',
  production = 'production',
}

export const APP_NAME = 'bx-file-transfer-service';
export const LOG_COLOR = process.env.LOG_COLOR === 'true' ? true : false;
export const ENV_NAME = process.env.ENV_NAME;

export const EXAMPLE_SYMBOL = Symbol.for('Example');

export enum TopicForSubscriptionCollection {
  example = '/example/+',
}

export const SERVER_PORT = process.env.SERVER_PORT;
export const SERVER_HOST = process.env.SERVER_HOST;

export const MQTT_USERNAME = process.env.MQTT_USERNAME;
export const MQTT_PASSWORD = process.env.MQTT_PASSWORD;
export const MQTT_HOST = process.env.MQTT_HOST;
export const MQTT_PORT = process.env.MQTT_PORT;
export const MQTT_PROTOCOL = process.env.MQTT_PROTOCOL;
export const MQTT_URL = `${MQTT_PROTOCOL}://${MQTT_HOST}:${MQTT_PORT}`;
