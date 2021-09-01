![](https://images.velog.io/images/nara7875/post/6a6b1f49-692a-4349-938a-bd0f649b3d09/image.png)
# 01.block chain 개념
## 01-1)코드의 맥락
- 네트워크(http, socket)
- 데이터를 저장하는 코드(분산원장)
c.f)socket(p2p 연결형식) 
## 01-2)Hash 
- sha256 (JWT토큰): 단방향 암호화(복호화할 수 없는 암호시스템)
					자리수 고정됨(a를 넣어도 n글자 bbbbdcaadsf를 넣어도 n자리...)
- 
## 01-3)merkle Tree
- package가 있다.
- 목적
 많은 블록들을 하나하나 찾아내는 일이 공수가 ㅁ낳아서 그보다 적게 우리가 찾으려는 걸 머클이라는 것을 통해서 빨리 가져올 수 있도록 하는 알고리즘이다.
-위변조 방지를 효율적으로 방지하는 시스템
출처:https://blockone.tistory.com/11
## 01-4) 
>__목적__: 
# 02.합의 알고리즘
네트워크에 돌아다니는 정보를 
## 02-1) 작업 증명(Proof of Work)

## 02-2) 지분 증명(Proof of Stake)


# 03. 블록의 구성 요소
## 03-1) 비트코인의 구성 요소
```javascript
const block={
	MagicNumber:"0x",
	BlockSize:"4mb",
  	header:{
    	version:"1.0.0",//fs로 가져옴.
    	HashPrevBlock:[나의 부모의 주소값],
    	HashMerkleRoot:`SHA256`,
    	timestamp:`시간`,//*이거가 중요하다! 주로 날짜 형태를 유닉스 기준일로 해서 넣는다. 함수로 받는다. 
    	bits: `작업증명 난이도를 정하는 `.
    	Nonce:`4byte의 (양수의) 난수`, //index임
    	},
   	body:{...객체일수도, 배열일수도...}
}
```
header와 body영역은 빠지지 않는다.
HashPrevBlock이 0x00000000이면 제네시스 블록이다.
그 요소는 헤더의 내용을 스트링으로 바꿔서 암호화를 한 거

```javascript
start line
Header
body
```



## 03-2)

```javascript
const fs = require('fs');//filesystem

function getVersion(){
    const package = fs.readFileSync("../package.json");
    console.log(package.toString("utf8"));
};


getVersion();

```

![](https://images.velog.io/images/nara7875/post/41791e73-5da2-4c18-ae5d-b75f523f9a2f/image.png)

![](https://images.velog.io/images/nara7875/post/f73a82ad-0e91-486e-a903-3251663613e6/image.png)
![](https://images.velog.io/images/nara7875/post/db408233-879c-45bc-98a6-78aa0591cc5a/image.png)