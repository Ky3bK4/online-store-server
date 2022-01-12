const Router = require('express')

const router = new Router()
const DeviceController = require('../controllers/DeviceController')
const checkRole = require('../middleware/checkRoleMiddleware')



router.post('/',checkRole('ADMIN'), DeviceController.create)
router.delete('/',checkRole('ADMIN'), DeviceController.delete)
router.get('/', DeviceController.getAll)
router.get('/:id', DeviceController.getOne)

module.exports = router