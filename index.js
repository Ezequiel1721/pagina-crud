'use strict'

const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')
const hbs = require('express-handlebars')
const router = require('./routers/routes')

const app = express()

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// Body parser
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// Recursos Staticos / Publicos
app.use('/static', express.static ('public'))

//Router out app


app.use('/', router)

// Motor de vistas
app.engine('.hbs', hbs({
    defaultLayout : 'index',
    extname : '.hbs'
}))

app.set('view engine', '.hbs')



// Ezequiel Galván Rodríguez

// Conexion a la BD
mongoose.connect(config.db, config.urlParser, (err,res)=>{

    if(err) {
        return console.log(`Error al conectar en la BD ${err}`)
    }

    console.log('conexion a la BD exitosa')

    app.listen(config.port, ()=>{
        console.log(`Ejecutando en http://localhost:${config.port}`)
    })

})