import { z } from "zod";
import { portSchema } from "./PortSchema";

const IProcessEnvSchema = z.object({
  PORT: portSchema,
  ENV: z.enum(['development', 'production', 'testing']),
  DB_NAME: z.string(),
  DB_PORT: portSchema,
  HOST: z.string()
})

export { IProcessEnvSchema }