import { Router } from 'express'
import { SendEmail } from './sendMail/sendMail'

const routes = new Router()

routes.post('/sendMail', SendEmail)

export default routes
