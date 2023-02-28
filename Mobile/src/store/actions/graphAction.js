import axios from 'axios'
import apiKey from '../api'
export default async (search, artistMbid) => {
    let res
    let similarArtists = null
    if (artistMbid)
        res = await axios.get(`${apiKey}/artist/${artistMbid}`)
    else {
        res = await axios.get(`${apiKey}/search/${search}`)
        if (res.data.title != 'NotFound')
            res = await axios.get(`${apiKey}/artist/${res.data.artist.mbid}`)
    }
    if (res.data.artist)
        similarArtists = getSimilarArtistsArray(res.data.artist)
    return {
        type: 'GRAPH',
        payload: {
            similarArtists: similarArtists
        }
    }
}


const getSimilarArtistsArray = (artist) => {
    let allSimilarArtists = artist.similars
    let similarArtists = allSimilarArtists.slice(0, 8)
    similarArtists.unshift({
        name: artist.name,
        mbid: artist.mbid,
        image: artist.image,
    })
    return similarArtists
}