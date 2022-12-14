const mongoose= require('mongoose')
const config= require('config')
const db= config.get('mongoURL')

const connectDB= async() =>{
    try {
        await mongoose.connect(db,{
            // useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
            // useFindAndModify: false
        })
        console.log('da ket noi csdl thanh cong')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

module.exports= connectDB