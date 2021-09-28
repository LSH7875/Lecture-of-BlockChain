// const { format } = require('sequelize/types/lib/utils');
const winston = require('winston');

const logger = winston.createLogger({
    level:'info',
    format: winston.format.json()
})

if(!process.env.NODE_ENV !=='production'){
    //개발모드일 경우
    logger.add(new winston.transports.Console({format : winston.format.simple() }));
}

module.exports = logger
// NODE_ENV 환경변수를 production development를 나눠서 똑같은 코드로 
// 