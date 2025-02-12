import { Router } from 'express'
import outletController from '../controller/outlet.controller'

const router = Router()

// router.route('/').get(outletController.getAllOutlets)

router.post('/register', outletController.registerOutlet)
router.put('/:id', outletController.editOutlet)
router.delete('/:id', outletController.deleteOutlet)

export default router
