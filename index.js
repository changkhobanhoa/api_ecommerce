require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const expressListEndpoints = require('express-list-endpoints')

const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const { notFound, errorHandler } = require('./middleware/errorHandler')

// router
const authRouter = require('./router/authRoute')
const productRouter = require('./router/productRoute')
const blogRouter = require('./router/blogRoute')
const categoryRouter = require('./router/prodcategoryRoute')
const blogcategoryRouter = require('./router/blogCatRoute')
const brandRouter = require('./router/brandRoute')
const colorRouter = require('./router/colorRoute')
const enqRouter = require('./router/enqRoute')
const couponRouter = require('./router/couponRoute')
const uploadRouter = require('./router/uploadRoute')
const app = express()
const api = process.env.API_URL
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
mongoose.Promise = global.Promise
mongoose
  .connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log('Database connected')
    },
    (error) => {
      console.log("Database can't be connected: ", error)
    }
  )
app.use('/api/user', authRouter)
app.use('/api/product', productRouter)
app.use('/api/blog', blogRouter)
app.use('/api/category', categoryRouter)
app.use('/api/blogcategory', blogcategoryRouter)
app.use('/api/brand', brandRouter)
app.use('/api/coupon', couponRouter)
app.use('/api/color', colorRouter)
app.use('/api/enquiry', enqRouter)
app.use('/api/upload', uploadRouter)
app.use(notFound)
app.use(errorHandler)
app.listen(5000, () => {
  const routes = expressListEndpoints(app)
  console.log(routes)
  console.log(`http://localhost:5000`)
})
