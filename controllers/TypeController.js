const {Type} = require('../models/models')
const ApiError = require('../error/ApiError')


class TypeController {
  async create(req, res) {
    const {name} = req.body
    const type =  await Type.create({name})
    return res.json(type)
  }
  async delete(req, res,next) {
    const {id} = req.body;
    if(!id) {
      return next(ApiError.badRequest('Не указан ID'))
    }
    await Type.destroy({where: {id}})
    return res.json({message: `Тип с ID ${id} успешно удален`})
  }
  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types)
  }

}

module.exports = new TypeController()