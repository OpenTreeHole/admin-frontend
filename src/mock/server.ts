import express, { Express, Router, Request, Response, NextFunction } from 'express'

const app: Express = express()
const router: Router = express.Router()

app.use('*', (_: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.use('/api', router)

router.get('/login', (req: Request, res: Response) => {
  res.json({
    // access: new WebToken()
    message: 'Login successful' // 甚至没有 ly
  })
})

export default app
