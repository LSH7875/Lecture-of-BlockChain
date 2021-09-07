let a =1;
let b = 2;
let fn = () =>{
    a=4;
    console.log('a=4?'+a)
    return false
}

function fn2(){
    console.log('b')
}

let c =10;
let o = {
    a:1,
    b:2
}

console.log(a)
if(fn()===true){
    console.log('if문');
    console.log('a:'+a);
}
console.log(a)
//JAVA:함수도 객체다
//javascript:함수도 객체다! 호출이 가능한 객체!!
