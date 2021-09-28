const express=require('express');
const router= express.Router();

//거래소 관련
//api 관련
router.use('/api',require('./rpc'))


module.exports = router