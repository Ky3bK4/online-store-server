require('dotenv').config();
const sequelize = require('./db');
const express = require('express');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload')
const PORT = process.env.PORT || 5000;
const router = require('./routes/index.js')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))

app.use('/api', router);
// Error handle, last middleware
app.use(errorHandler);


app.get('/', (req, res) => {
  res.status(200).json({message: 'Working'})
})

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, ()=>console.log(`server listening on ${PORT}`));
  } catch (err) {
    console.log(err)
  }
}

start()