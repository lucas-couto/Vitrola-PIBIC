const axios = require('axios')
const API = require('../api')
export async function artist(artistMbid) {
    return await axios.get(`${API}/artist/${artistMbid}`)
        .then(res => {
            return {
                type: 'ARTIST',
                payload: {
                    artistMbid: res.data.artist.artistMbid,
                    artistName: res.data.artist.artistName,
                    artistBiography: res.data.artist.artistBiography,
                    artistImage: res.data.artist.artistImage,
                    similarArtists: res.data.artist.similarArtists,
                    artistAlbums: res.data.artist.artistAlbums
                }
            }
        })
        .catch(e => {
            console.log(e)
        })
}