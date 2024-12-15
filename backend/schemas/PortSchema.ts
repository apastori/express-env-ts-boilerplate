import { z } from 'zod'

// Define a schema for a valid port string
const portSchema = z.union([z.number(), z.string()]).refine((str) => {
  const port: number = typeof str === 'string' ? parseInt(str, 10) : str
  return !isNaN(port) && port >= 0 && port <= 65535;
}, {
  message: "Invalid port string, must be a string number between 0 and 65535."
})

export { portSchema }