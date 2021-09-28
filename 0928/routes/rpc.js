const express = require('express');
const router = express.Router();
const request =require('request');
const logger= require('../logger');
require('dotenv').config()
//실제 개발할때는 리눅스에 환경변수를 넣고 하는거임. dotenv를 쓰는 것이 아니라 ㅎㅎㅎㅎ

function createbody(method,params=[]){
    let obj={
        jsonrpc:"1.0",
        id:ID_STRING,
        method,
        params, 
    }
    return JSON.stringify(obj); 
}
const headers = {"Content-type":"application/json"}
const USER = process.env.RPC_USER ;
const PASS = process.env.RPC_PASSWORD;
const RPCPORT = process.env.RPC_PORT;


const url = `http://${USER}:${PASS}@127.0.0.1:${RPCPORT}`


const ID_STRING = 'penguine_coinOne'
//거래소만의 계정이 있어야함. 거래소는 코인을 많이 가지고 있어야함.
const ACCOUNT = 'Penguinecoin'

router.get('/test',(req,res)=>{
    res.json({msg:'test api'})
})

router.get('/getblockcount',(req,res,next)=>{
    let body=createbody('getblockcount',[])
    logger.info(body)
    logger.info(USER)
    logger.info(PASS)
    logger.info(RPCPORT)
    let options = {url,method:"POST",headers,body}

    const callback=(err,response,data)=>{
        if(err==null && response.statusCode ==200){
            const body = JSON.parse(data)
            logger.info('afadsfa')
            res.json(body)
        }else{
            logger.error('getblockcount error')
            next()
        }
    }

    request(options,callback)
})


module.exports = router; 