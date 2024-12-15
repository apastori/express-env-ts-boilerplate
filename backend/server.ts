import express, { Application, Request, Response }  from 'express'
import { ProcessEnvFinal } from './loadEnv'
import { startExpressServer } from './startExpressServer'

Object.assign(process.env, ProcessEnvFinal)

const app: Application = express()

const PORT: string | '5000' = process.env['PORT'] || '5000'

app.get('/', (_req: Request, res: Response) => {
    //root route http://localhost:5000
    res.send('Hello World!')
})

startExpressServer(app, PORT);

