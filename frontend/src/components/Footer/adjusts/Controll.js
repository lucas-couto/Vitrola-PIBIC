let musicIndex

export function actualMusic(musicArray, musicMbid){
    musicIndex = 0
    if(musicArray && musicArray.length != 0){
        for (musicIndex; musicIndex < musicArray.length; musicIndex++) {
            if(musicArray[musicIndex].musicMbid == musicMbid)
                break
        }
    }
    return musicIndex
}
