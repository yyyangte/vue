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
    let url='/hh/music/api/getTopBanner?g_tk=1928093487&inCharset=utf8&outCharset=utf-8&notice=0&format=json&platform=yqq.json&hostUin=0&needNewCode=0&-=recom256724530225378&data=%7B%22comm%22:%7B%22ct%22:24%7D,%22category%22:%7B%22method%22:%22get_hot_category%22,%22param%22:%7B%22qq%22:%22%22%7D,%22module%22:%22music.web_category_svr%22%7D,%22recomPlaylist%22:%7B%22method%22:%22get_hot_recommend%22,%22param%22:%7B%22async%22:1,%22cmd%22:2%7D,%22module%22:%22playlist.HotRecommendServer%22%7D,%22playlist%22:%7B%22method%22:%22get_playlist_by_category%22,%22param%22:%7B%22id%22:8,%22curPage%22:1,%22size%22:40,%22order%22:5,%22titleid%22:8%7D,%22module%22:%22playlist.PlayListPlazaServer%22%7D,%22new_song%22:%7B%22module%22:%22newsong.NewSongServer%22,%22method%22:%22get_new_song_info%22,%22param%22:%7B%22type%22:5%7D%7D,%22new_album%22:%7B%22module%22:%22newalbum.NewAlbumServer%22,%22method%22:%22get_new_album_info%22,%22param%22:%7B%22area%22:1,%22sin%22:0,%22num%22:10%7D%7D,%22new_album_tag%22:%7B%22module%22:%22newalbum.NewAlbumServer%22,%22method%22:%22get_new_album_area%22,%22param%22:%7B%7D%7D,%22toplist%22:%7B%22module%22:%22musicToplist.ToplistInfoServer%22,%22method%22:%22GetAll%22,%22param%22:%7B%7D%7D,%22focus%22:%7B%22module%22:%22QQMusic.MusichallServer%22,%22method%22:%22GetFocus%22,%22param%22:%7B%7D%7D%7D'
    axios.get(url)
    .then((data)=>{
      resolve(data)
    })
    .catch((err)=>{
      reject(err)
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

export const getSongList=(id)=>{
  return new Promise((resolve,reject)=>{
    let url='https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&hostUin=0&needNewCode=0&platform=yqq&order=listen&begin=0&num=80&songstatus=1&singermid='+id;
    jsonp(url,{param:'jsonpCallback',},(err,data)=>{
      if(err){
        reject(err)
      }else{
        resolve(data)
      }
    })
  })
}

export const getMusicUrl=(mid)=>{
  let url='/hy/cgi-bin/musicu.fcg'
  // https://u.y.qq.com/cgi-bin/musicu.fcg
  let songmid=mid||'003mBrF72dILfK'
  let data={
   params:{
     '-':'getplaysongvkey18692067669581247',
     g_tk: 5381,
     loginUin: 0,
     hostUin: 0,
     format: 'json',
     inCharset: 'utf8',
     outCharset: 'utf-8',
     notice: 0,
     platform: 'yqq.json',
     needNewCode: 0,
     data:`{"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"1595362978","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"1595362978","songmid":["${songmid}"],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":20,"cv":0}}`
   }
  }
  return new Promise((resolve,reject)=>{
    axios(url,data)
    .then((data)=>{
      let prev='http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/'
      let purl = data.req_0.data.midurlinfo[0].purl
       resolve(prev+purl)
    })
  })
}