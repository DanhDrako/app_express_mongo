const express= require('express')
const { engine } = require('express-handlebars')
const bodyParser= require('body-parser')
// const exphbs= require('express-handlebars')
//tiep nhan put,delete... request(because html post,get)
const methodOverride= require('method-override')
const connectDB= require('./config/db')

//Nhap khau routes
const posts= require('./routes/posts')
//Khoi dong app
const app= express()

//Khoi dong Handlebars midleware
app.engine('handlebars', engine())
// app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

//Khoi dong bodyParser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Khoi dong methodOverride middleware
app.use(methodOverride('_method'))

//Khoi dong express middleware
app.use(express.json())
//ket noi csdl 
connectDB()

//Mot so routes co ban, co the dua vao file rieng trong thu muc routes
app.get('/',(req,res)=> res.render('index'))
app.get('/about',(req,res)=> res.render('about'))

//Mang routes vao de su dung
app.use('/posts',posts)
const PORT= 5000

app.listen(PORT, () => console.log(`Server khoi dong tai port ${PORT}`))