/**
 * 
 *  var eventList = {
        click:[fn1,fn2,fn3],
        handle:[]
    }
    $on(eventName,[callback])
    首先判断事件名称是否存在，如果存在则直接将事件函数push到对应数组里
    如果不存在，则给当前事件赋一个数组，然后再将函数push

    $emit(eventName,[params])
    判断函数名称是否存在，如果存在则遍历对应的数组，
    调用数组里的每一个函数，如果需要传递参数，只需要调用函数的时候将参数传入

    $off(eventName,[callback])
    判断名称是否存在
    判断第二个参数是否存在，存在就获取到数组下标移除，不存在就清空
*/
const eventList = {}
const $on = (eventName,callback)=>{
    if(!eventList[eventName]){
        eventList[eventName]=[];
    }
    eventList[eventName].push(callback);
}
const $emit = (eventName,params)=>{
    if(eventList[eventName]){
        eventList[eventName].forEach(cb=>{
            cb(params)
        })
    }
}
const $off = (eventName,callback)=>{
    if(callback){
        let index = eventList[eventName].indexOf(callback);
        eventList[eventName].splice(index,1);
    }else{
        eventList[eventName].length = 0;//这是清空数组最快的方式
    }
}

function fn1(params){
    console.log(11,params)
}
function fn2(params){
    console.log(22,params)
}
function fn3(params){
    console.log(33,params)
}
$on("handle",fn1);
$on("handle",fn2);
// $once("handle",fn3);
$off("handle",fn1)
$emit("handle","yang")
$emit("handle","ya")