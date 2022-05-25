const axios = require('axios')
const API = require('../api')
export async function artist(artistMbid) {
    return await axios.get(`${API}/artist/${artistMbid}`)
        .then(res => {
            return {
                type: 'ARTIST',
                payload: {
                    artistMbid: res.data.artist.mbid,
                    artistName: res.data.artist.name,
                    artistBiography: res.data.artist.biography,
                    artistImage: res.data.artist.image,
                    similarArtists: res.data.artist.similarArtists,
                    artistAlbums: res.data.artist.artistAlbums,
                    loadingApp: false
                }
            }
        })
        .catch(e => {
            console.log(e)
        })
}