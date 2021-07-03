import React, { useState } from 'react'
import './Albums.css'

import Musics from './Musics/Musics'
import { connect } from 'react-redux'
import { album } from '../../../store/actions/albumAction'

let name
let mbid
const Albums = props => {
    const { artistAlbums, albumName, albumMbid, albumBiography, albumImage, albumMusics } = props
    const [album_Name, setAlbumName] = useState('block')
    const [displayAlbumList, setDisplayAlbumList] = useState('block')
    const [displayFeaturedAlbum, setDisplayFeaturedAlbum] = useState('none')
    const [showAlbumBiography, setShowAlbumBiography] = useState(false)
    const [showAlbumMusics, setShowAlbumMusics] = useState(false)
    const [showFeaturedAlbum, setShowFeaturedAlbum] = useState(false)

    const List = artistAlbums.map(album => {
        if (album.albumMbid === albumMbid) {
            return (
                <div className="featuredAlbum">
                    <li onClick={handleClickFeaturedAlbum} data-mbid={album.albumMbid} data-name={album.albumName} key={album.albumMbid}>
                        <a href="#">
                            <img src={process.env.PUBLIC_URL + album.albumImage} width="50" height="50" 
                            onError={e => {e.target.src = process.env.PUBLIC_URL + "./photos/musics/principalMusicIcon.png"}}/>
                            <strong>{album.albumName}</strong>
                        </a>
                    </li>
                </div>
            )
        }
        return (
            <li onClick={handleClickFeaturedAlbum} data-mbid={album.albumMbid} data-name={album.albumName} key={album.albumMbid}>
                <a href="#">
                    <img src={album.albumImage} width="50" height="50" 
                    onError={e => {e.target.src = process.env.PUBLIC_URL + "./photos/musics/principalMusicIcon.png"}}/>
                    <strong>{album.albumName}</strong>
                </a>
            </li>
        )
    })

    function handleClickAlbumBiography() {
        setShowAlbumBiography(!showAlbumBiography);
    }
    function handleClickAlbumMusics() {
        setShowAlbumMusics(!showAlbumMusics);
    }

    function handleClickFeaturedAlbum(e) {
        name = e.currentTarget.getAttribute("data-name")
        mbid = e.currentTarget.getAttribute("data-mbid")
        setAlbumName(name)
        props.albumInformations(mbid)
        setShowFeaturedAlbum(true)
        setDisplayFeaturedAlbum('flex')
        setDisplayAlbumList('none')
    }

    function handleClickAlbumList() {
        setShowFeaturedAlbum(false)
        setDisplayFeaturedAlbum('none')
        setDisplayAlbumList('block')
    }


    function albumInfo() {
        return (
            <div className="featureAlbum" style={{ display: displayFeaturedAlbum }}>
                <div className="albumInfo">
                    <strong className="albumName">{album_Name}</strong>
                    <div className="albumContent">
                        {/* <div className="albumBiography">
                            <button className="albumBiographyBtn" onClick={handleClickAlbumBiography}><span>Biografia do album</span></button>
                            <div>
                                {showAlbumBiography ? (
                                    <div className="albumBiographyText" style={{ backgroundColor: '#9C9C9C' }}>
                                        <img src={albumImage} alt="" />
                                        <p>
                                            {albumBiography}
                                        </p>
                                    </div>
                                ) : null}
                            </div>
                        </div> */}
                        <div>
                            <button className="albumBiographyBtn" onClick={handleClickAlbumMusics} disabled={albumMusics ? false : true}>Musicas do album</button>
                            <div className="Musics">
                                {showAlbumMusics ? (
                                    <div className="albumMusics" style={{ backgroundColor: '#9C9C9C' }}>
                                        <Musics />
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="albumList">
            <button className="albumsListBtn" onClick={handleClickAlbumList}>Albums</button>
            <div className="albums" style={{ display: displayAlbumList }}>
                <ul>
                    {List}
                </ul>
            </div>
            {showFeaturedAlbum ? (albumInfo()) : null}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        artistAlbums: state.artist.artistAlbums,
        albumMbid: state.album.albumMbid,
        albumName: state.album.albumName,
        albumBiography: state.album.albumBiography,
        albumImage: state.album.albumImage,
        albumMusics: state.album.albumMusics
    }
}

const mapDispatchToProp = dispatch => {
    return {
        async albumInformations(albumMbid) {
            dispatch(await album(albumMbid))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(Albums)