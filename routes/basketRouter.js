const Router = require('express')

const router = new Router()

const BasketDeviceController = require('../controllers/BasketDeviceController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole(['ADMIN', 'USER']), BasketDeviceController.create)
router.delete('/', checkRole(['ADMIN', 'USER']), BasketDeviceController.delete)
router.get('/', BasketDeviceController.getAll)

module.exports = router