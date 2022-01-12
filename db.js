const {Sequelize} = require('sequelize')

if(process.env.NODE_ENV === 'development') {
  module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT
    }
  )
} else if(process.env.NODE_ENV === 'production') {
  console.log('wew')
  module.exports = new Sequelize(
    process.env.DATABASE_URL,
    {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    }
  )
}

