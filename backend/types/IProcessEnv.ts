import { Environment } from './Environment'

export interface IProcessEnv {
    PORT: string,
    ENV: Environment,
    DB_NAME: string,
    DB_PORT: string,
    HOST: string
}