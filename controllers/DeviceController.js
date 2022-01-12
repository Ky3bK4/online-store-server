const {Device, DeviceInfo} = require('../models/models')
const path = require('path')
const  uuid = require('uuid')
const ApiError = require('../error/ApiError')
const { unlink, existsSync } = require('fs');

class DeviceController {
  async create(req, res, next) {
    try {
      let {name, price, brandId, typeId, info} = req.body
      //Получение файла
      const {img} =  req.files
      let fileName = uuid.v4() + ".jpg"
      // Перенос файла по заданому пути
      await img.mv(path.resolve(__dirname, '..', 'static', fileName))
      // Создание строки
      const device = await Device.create({name, price, brandId, typeId, img: fileName})
      // Если существует "info" - парсится и создается в таблице "Device info"
      if(info) {
        info = JSON.parse(info)
        info.forEach(i=> DeviceInfo.create({
          title: i.title,
          description: i.description,
          deviceId: device.id
        }))
      }
      return res.json(device)
    } catch (err) {
      next(ApiError.badRequest(err.message))
    }

  }
  async getAll(req, res, next) {
    try {
      let {brandId, typeId, limit = 9, page = 1} = req.query
      // Отступ - какое количество строк должно быть пропущенно прежде чем их возвращать
      let offset = (page * limit) - limit
      let devices;
      // Не указан бренд ИД и Тип ИД
      // FindAndCountAll - возвращает объект со свойством "count"(количеством элементов в "rows")
      // и rows - массив строк
      if(!brandId && !typeId) {
        devices = await Device.findAndCountAll({limit, offset})
      }
      if(brandId && !typeId) {
        devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
      }
      if(!brandId && typeId) {
        devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
      }
      if(brandId && typeId) {
        devices = await Device.findAndCountAll({where:{brandId, typeId}, limit, offset})
      }
      return res.json(devices)
    } catch (err) {
      next(ApiError.badRequest(err.message))
    }
  }
  async getOne(req, res) {
    const {id} = req.params
    // Ищем девайс и связанную с ним модель DeviceInfo
    const device = await Device.findOne(
      {
        where:{id},
        include: [{model: DeviceInfo, as: 'info'}]
      }
    )
    return res.json(device)
  }
  async delete(req, res,next) {
    try {
      const {id} = req.body;
      if(!id) {
        return next(ApiError.badRequest('Не указан ID'))
      }
      const device = await Device.findOne({where:{id}})
      await Device.destroy({where: {id}})

      const pathToImg = path.resolve(__dirname, '..','static', device.img)
      if(existsSync(pathToImg)) {
        await unlink(pathToImg, (e)=>{
          if(e) throw e
        })
      }
      return res.json({message: `Бренд с ID ${id} успешно удален`})
    } catch (err) {
      next(ApiError.internalServerError('Что-то пошло не так'))
    }
  }
}

module.exports = new DeviceController()