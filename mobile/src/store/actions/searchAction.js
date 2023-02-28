import axios from 'axios'
import apiKey from '../api'
let res

export default async search => {
    res = await axios.get(`${apiKey}/search/${search}`)
    if (res.data.title == "NotFound")
        return {
            type: 'NOT_FOUND',
            payload: {
                notFound: true
            }
        }
    else {
        res = await axios.get(`${apiKey}/artist/${res.data.artist.mbid}`)
        return {
            type: 'SEARCH',
            payload: {
                artistName: res.data.artist.name,
                artistMbid: res.data.artist.mbid,
                artistImage: res.data.artist.image,
                artistBiography: res.data.artist.biography,
                artistAlbums: res.data.artist.albums,
                similarArtists: res.data.artist.similars,
                notFound: false
            }
        }
    }
}

