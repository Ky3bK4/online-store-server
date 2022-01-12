const Router = require('express')
const TypeController = require('../controllers/TypeController')

const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'), TypeController.create)
router.delete('/',checkRole('ADMIN'), TypeController.delete)
router.get('/', TypeController.getAll)

module.exports = router