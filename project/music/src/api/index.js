import axios from '../utils/axios'
import jsonp from 'jsonp'
export const getRecommentList=()=>{
  return new Promise((resolve,reject)=>{
    let url='/hh/music/api/getDiscList?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000&rnd=0.03328395236535786'
    axios.get(url)
    .then((data)=>{
      resolve(data)
    })
    .catch((err)=>{
      reject(err)
    })
  })
}
export const getBanner=()=>{
  return new Promise((resolve,reject)=>{
    let url='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&platform=h5&uin=0&needNewCode=1'
    jsonp(url,{param:"jsonpCallback"},(err,data)=>{
      if(err){
        reject(err)
      }else{
        resolve(data)
      }
    })
  })
}

export const getSingerList=()=>{
  return new Promise((resolve,reject)=>{
    let url="https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq"
    jsonp(url,{param:'jsonpCallback'},(err,data)=>{
      if(err){
        reject(err)
      }else{
        resolve(data)
      }
    })
  })
}
