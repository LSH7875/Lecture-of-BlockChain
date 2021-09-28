const express = require('express');
const app = express();
const PORT=process.env.PORT || 3500;
const nunjucks= require('nunjucks');
const db = require('./models')
const morgan = require('morgan')//middleware역할 요청이 오면 먼저 morgan이 실행됨 그래서 위에 좋재하는게 좋음 
const logger = require('./logger')
const router = require('./routes')
require('dotenv').config()
//db sequelize
db.sequelize.sync({force:true})
.then(_=>{
    console.log('DB connection success')
})
.catch( err=>{
    console.log(`DB disconnection ${err}`)
})

app.use(morgan('dev'))


app.set('view engine','html');
nunjucks.configure('views',{express:app});

app.use('/',router)

app.use((req,res,next)=>{
    const error = new Error(`${req.method} ${req.url} 정보가 없습니다.`)
    error.status = 404;
    logger.error(error.message)
    res.render('404')
})

app.listen(PORT,()=>{
    console.log(`server port ${PORT}`)
})

