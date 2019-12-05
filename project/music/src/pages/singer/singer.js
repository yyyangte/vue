export const  initSingerData=(list)=>{
  console.log('歌手数据',list)
  //创建默认数据格式  hot 
  let singers={'hot':{title:'hot',list:[]}}
 //  循环数据源 组成需要的数据对象
  for (let index = 0; index < list.length; index++) {
    let {Findex,Fsinger_name,Fsinger_mid}=list[index]
    //如果是前10条数据就是最热
    let  Fsinger_url=`https://y.gtimg.cn/music/photo_new/T001R300x300M000${Fsinger_mid}.jpg?max_age=2592000`
    if(index<10){
      singers.hot.list.push({Findex,Fsinger_name,Fsinger_mid,Fsinger_url})
    } 
     // 根据首字母进行判断 新的数据格式中是否存在 存在 push 歌手 不存在添加对象
     if(singers[Findex]){
       // 数据下标有了listpush
       singers[Findex].list.push({Findex,Fsinger_name,Fsinger_mid,Fsinger_url})
     }else{
       //添加新的 
       singers[Findex]={
         title:Findex,
         list:[{Findex,Fsinger_name,Fsinger_mid,Fsinger_url}]
       }
     } 
  }
 // 排序sort 方法需要是数组 将对象格式转化为数组
 let hot=[singers.hot]
 let other=[] 
 // 将hot 与其他特殊格式进行分离
 for (const key in singers) {
   if(key!=='hot'&&key!=='9'){
     other.push(singers[key])
   }
 }
 // 用sort 方法按照下标排序
 let sortArr=other.sort((a,b)=>{return a.title.charCodeAt()-b.title.charCodeAt()})
 let result = hot.concat(sortArr)
 console.log(result)
  return result

 }
 export const avatorUrl=(mid)=>{
  var mid=mid||'002J4UUk29y8BY'
  return `https://y.gtimg.cn/music/photo_new/T001R300x300M000${mid}.jpg?max_age=2592000`
}