let musicIndex

// Logica para identificar o indice de uma musica especifica em um array
export function actualMusic(musicArray, musicMbid) {
    musicIndex = 0
    if (musicArray && musicArray.length != 0) {
        for (musicIndex; musicIndex < musicArray.length; musicIndex++)
            if (musicArray[musicIndex].mbid == musicMbid)
                break
    }
    if(musicIndex == musicArray.length - 1)
        return -1
    return musicIndex
}

