const express= require('express');
const port = 3800;
const app = express();
const cheerio = require('cheerio')
const request=require('request')
//기본적으로 함수

app.get('/',(req,res)=>{
    res.send('hello pencoin')
})

app.get('/naver2',(req,res)=>{
    request({
        url:"http://never.com",
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:"{msg:'hello world!'}"
        },
        (err,response,data)=>{
            console.log(data);
            console.log(response.statusCode);
            if(err ==null && response.statusCode ==200){
                res.send("naver2")
            } else{
                res.send('error')
            }
    })
})

app.get('/naver2',(req,res)=>{
    request({
        url:"http://never.com",
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:"{'msg':'hello world!'}"
        },
        (err,response,data)=>{
            console.log(data);
            console.log(response.statusCode);
            if(err ==null && response.statusCode ==200){
                res.send("naver2")
            } else{
                res.send('error')
            }
    })
})

/*
curl 
-X POST 
-H "Content-type: application/json" 
-d '{
    "method":"getnewaddress","params":["penguine1"]}' 
penguin:1234@127.0.0.1:3001
*/

app.get('/newaddress/:account',(req,res)=>{
    const {account} = req.params
    headers={"Content-type": "application/json"};
    body=`{"method":"getnewaddress","params":["${account}"]}`;

    const USER=process.env.RPC_USER || 'penguin';
    const PASS = process.env.RPC_PASSWORD || '1234';
    const RPCPORT= process.env.RPC_PORT || 3001;
    const options={
        url:`http://${USER}:${PASS}@127.0.0.1:${RPCPORT}`,
        method:"POST",
        headers,
        body
    }

    const callback = (err,response,data)=>{
        if(err==null && response.statusCode ==200) {
            const body = JSON.parse(data);
            res.send(body)//res.render로 할 수 있다. 
        }else{
            res.send(err)
        }
    }
    request(options,callback)
})

app.get('/crawling',(req,res)=>{
    request(`https://naver.com`,(err,response,data)=>{
        let $ = cheerio.load(data); //선택자 return 값은 함수임
        $('.partner_box_wrap > .partner_box:nth-child(3) > a').each((index,item)=>{
            console.log(item.children[0].data)
            let data = item.children[0]
            console.log(data);
            //selector
            
        })

    })
    res.send('ggg')
})

app.get('/naver',(req,res)=>{
    //request함수는 2개의 인자값 존재
    //1.어디로 정보를 보낼지 url(string) or object{url}
    //2.callback(3개의 인자값) 
    request(`https://naver.cm`,(err,response,body)=>{
        // 응답을 객체형태로 가져오는게 response
        //         string형태로 가져오는게 body
        console.log(err);
        msg = "naver"
        if(err==null){
            res.send(msg);
        }else{
            res.send(err);
        }
        res.send('naver');
    });
    
    
})


app.listen(port,()=>{
    console.log(`server port ${port}`)
})
