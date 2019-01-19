var express = require('express')
var app = express()
var path = require('path')
var morgan  = require('morgan')
var mysql = require('mysql')
var myConnection = require('express-myconnection')

//Para brindar un puerto libre que de el sistema operativo o el puerto 3000
app.set('port', process.env.PORT || 3000)
//configurar motor de plantillas
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))


//importar rutas

const customerRoutes = require('./routes/customers.js')

//middlewares
app.use(morgan('dev'))

//CONEXION DB middlewares
app.use(myConnection(mysql,{

  host:'localhost',
  user:'root',
  password:'Cloud*7319',
  port: 3306,
  database:'express'
}, 'single'))
//para que servidor entienda lo que se envia desde el formulario
app.use(express.urlencoded({extend:false}))

//routes
app.use('/', customerRoutes)


//static files
app.use(express.static(path.join(__dirname, 'public')))

//iniciar servidor
app.listen(app.get('port'), ()=>
{
  console.log('server init on port '+ app.get('port'))
})
