const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError')


class BrandController {
  async create(req, res) {
    const {name} = req.body
    const brand =  await Brand.create({name})
    return res.json(brand)
  }
  async delete(req, res,next) {
    const {id} = req.body;
    if(!id) {
      return next(ApiError.badRequest('Не указан ID'))
    }
    await Brand.destroy({where: {id}})
    return res.json({message: `Бренд с ID ${id} успешно удален`})
  }
  async getAll(req, res) {
    const brands = await Brand.findAll()
    return res.json(brands)
  }
}

module.exports = new BrandController()