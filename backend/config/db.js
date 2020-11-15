const  mongoose = require('mongoose') 
const colors = require('colors')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })
        console.log( colors.green.underline(`MongoDb connected ${conn.connection.host}`))
    } catch (error) {
        console.error(colors.red.underline(`Error ${error.message}`))
        process.exit(1)
    }
}

module.exports = connectDB