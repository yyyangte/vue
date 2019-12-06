export const initSongData=(list)=>{
  console.log(list)
  let songs = [];
  list.map((item,index)=>{
  
    let {songorig,songmid,albumname,albummid} = item.musicData;
    let singer ="";
    for(let i = 0;i<item.musicData.singer.length;i++){
      singer+=( item.musicData.singer[i].name)+"/";
    }
    singer=singer.replace(/\/{1}$/g,"");
 
    songs.push({songorig,singer,albumname,albummid,songmid})
  })

  return songs;
}