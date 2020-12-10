// some changes
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const colors = require('colors')
const path = require('path')
// errorMiddleware
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorMiddleware')
//routes
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')

const morgan = require('morgan')

dotenv.config()

connectDB() // асинхронная функция подключения к БД

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json()) // для подключения передачи по json между сервером и клиеннтом

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes) // роуты для вывода родуктов и продукта по id
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => 
    res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('API is running...')
    })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(colors.green(`Serever run on port ${PORT}`)))