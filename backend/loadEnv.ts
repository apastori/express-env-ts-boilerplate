import { readFileSync } from 'fs'
import { join } from 'path'
import { EnvLoadingError } from './errors/EnvLoadingError'
import { isValidString } from './utils/isValidString'
import { EnvInvalidString } from './errors/EnvInvalidStringError'
import { isValidJSON } from './utils/isValidJSON'
import { EnvInvalidJSON } from './errors/EnvInvalidJSON'
import { isValidProcessEnv } from './utils/isValidProcessEnv'
import { EnvInvalidProcessEnvError } from './errors/EnvInvalidProcessEnvError'
import { IProcessEnvSchema } from './schemas/ProcessEnvSchema'
import { IProcessEnv } from './types/IProcessEnv'

let jsonStringEnv: string | undefined
const envFilePath: string = join(__dirname, '../env.json');

try {
    jsonStringEnv = readFileSync(envFilePath, 'utf-8')
} catch (err: unknown) {
    if (err instanceof Error) throw new EnvLoadingError(err.message)
    console.error("Unknown error:", err)
}

// Check if the Loading Env Process string provided is not empty or undefined

if (!isValidString(jsonStringEnv)) throw new EnvInvalidString()

// Check if the Loading Env Process string provided a valid JSON

if (!isValidJSON(jsonStringEnv as string)) throw new EnvInvalidJSON()

// Check if the Loading Env Process provided a valid ProcessEnv

const data: any = JSON.parse(jsonStringEnv as string)

if (!isValidProcessEnv(data)) throw new EnvInvalidProcessEnvError()

// Check if the Loading Env Process provided a valid ProcessEnv using Zod

const ProcessEnvParsed: {
    PORT: string | number;
    ENV: "development" | "production" | "testing";
    DB_NAME: string;
    DB_PORT: string | number;
    HOST: string;
} = IProcessEnvSchema.parse(data);

const { PORT, DB_PORT } = ProcessEnvParsed

const ProcessEnvFinal: IProcessEnv = {
    ...ProcessEnvParsed,
    PORT: typeof PORT === 'string' ? PORT : String(PORT),
    DB_PORT: typeof DB_PORT === 'string' ? DB_PORT : String(DB_PORT)
}

export { ProcessEnvFinal }