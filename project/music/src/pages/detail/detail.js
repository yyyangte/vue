export const initSongData = (list) => {
  // console.log(list)
  let songs = [];
  list.map((item, index) => {
    if (item.musicData.vid != "") {
      let { songorig, songmid, albumname, albummid, singer, interval } = item.musicData;
      let singername = "";
      for (let i = 0; i < item.musicData.singer.length; i++) {
        singername += (item.musicData.singer[i].name) + "/";
      }
      singername = singername.replace(/\/{1}$/g, "");
      songs.push({ songorig, singername, albumname, albummid, songmid, singer, interval })
    }
  })

  return songs;
}