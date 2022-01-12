const Router = require('express')

const router = new Router()

const BrandController = require('../controllers/BrandController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), BrandController.create)
router.delete('/', checkRole('ADMIN'), BrandController.delete)
router.get('/', BrandController.getAll)

module.exports = router