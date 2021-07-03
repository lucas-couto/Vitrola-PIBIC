const axios = require('axios')
const API = require('../api')
export async function album(albumMbid) {
    return await axios.get(`${API}/album/${albumMbid}`)
        .then(res => {
            return {
                type: 'ALBUM',
                payload: {
                    artistMbid: res.data.artist.artistMbid,
                    artistName: res.data.artist.artistName,
                    artistBiography: res.data.artist.artistBiography,
                    artistImage: res.data.artist.artistImage,
                    similarArtists: res.data.artist.similarArtists,
                    artistAlbums: res.data.artist.artistAlbums,
                    albumMbid: res.data.album.albumMbid,
                    albumName: res.data.album.albumName,
                    albumBiography: res.data.album.albumBiography,
                    albumImage: res.data.album.albumImage,
                    albumMusics: res.data.album.albumMusics
                }
            }
        })
        .catch(e => {
            console.log(e)
        })
}