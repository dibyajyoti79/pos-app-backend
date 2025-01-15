import { Router } from 'express'
import { getHealth, self } from '../controller/health.controller'

const router = Router()

router.route('/').get(self)

router.route('/health').get(getHealth)

export default router

