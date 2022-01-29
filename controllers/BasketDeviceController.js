const {BasketDevice, Device} = require('../models/models')
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError')

class BasketDeviceController {
  async create(req, res, next) {
    const {deviceId} = req.body
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    if(!deviceId) {
      return next(ApiError.badRequest('Не указан deviceId'))
    }

    const deviceToBasket = await BasketDevice.create({basketId: decoded.id, deviceId})
    return res.json(deviceToBasket)
  }

  async getAll(req, res) {
    const device = await BasketDevice.findAndCountAll(
      {
        include: [{model: Device, as: 'device'}]
      }
    )
    return res.json(device)
  }

  async delete(req, res,next) {
    const {id} = req.body
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    if(!id) {
      return next(ApiError.badRequest('Не указан id'))
    }

    await BasketDevice.destroy({where: {basketId: decoded.id, id}})
    return res.json({message: `Операция прошла успешно`})
  }
}

module.exports = new BasketDeviceController()