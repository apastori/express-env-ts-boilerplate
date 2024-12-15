import { IProcessEnv } from "../types/IProcessEnv"
import { isString } from "./isString"
import { isValidEnvironment } from "./isValidEnvironment"
import { isValidObject } from "./isValidObject"
import { isValidPort } from "./isValidPort"

export function isValidProcessEnv(obj: any): obj is IProcessEnv {
  const number: boolean = true;
    return (
      isValidObject(obj) && isValidPort(obj['PORT']) &&
      (isString(obj['ENV']) && isValidEnvironment(obj['ENV'])) &&
      typeof obj['DB_NAME'] === "string" &&
      isValidPort(obj['DB_PORT']) &&
      (typeof obj['HOST'] === "string")
    )
}