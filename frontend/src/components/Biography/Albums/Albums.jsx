import React, { useEffect, useState } from 'react'
import './Albums.css'

import { Ring } from 'react-spinners-css';
import Musics from './Musics/Musics'
import { connect } from 'react-redux'
import { album } from '../../../store/actions/albumAction'
import API from '../../../store/api'
let name
let mbid
const Albums = props => {
    const { artistAlbums, albumMbid, albumMusics } = props
    const [album_Name, setAlbumName] = useState('block')
    const [displayAlbumList, setDisplayAlbumList] = useState('block')
    const [displayFeaturedAlbum, setDisplayFeaturedAlbum] = useState('none')
    const [showAlbumBiography, setShowAlbumBiography] = useState(false)
    const [showAlbumMusics, setShowAlbumMusics] = useState(false)
    const [showFeaturedAlbum, setShowFeaturedAlbum] = useState(false)
    const List = artistAlbums.map(album => {
        if (album.albumMbid === albumMbid) {
            return (
                <div className="featuredAlbum" key={album.albumMbid}>
                    <li onClick={handleClickFeaturedAlbum} data-mbid={album.albumMbid} data-name={album.albumName} key={album.albumMbid}>
                        <a href="#">
                            <img src={`${API}/image?imageDirectory=${album.albumImage}`} width="50" height="50"
                                onError={e => { e.target.src = `${API}/image?imageDirectory=/music/principalMusicIcon.png` }} />
                            <strong>{album.albumName}</strong>
                        </a>
                    </li>
                </div>
            )
        }
        return (
            <li onClick={handleClickFeaturedAlbum} data-mbid={album.albumMbid} data-name={album.albumName} key={album.albumMbid}>
                <a href="#">
                    <img src={`${API}/image?imageDirectory=${album.albumImage}`} width="50" height="50"
                        onError={e => { e.target.src = `${API}/image?imageDirectory=/music/principalMusicIcon.png` }} />
                    <strong>{album.albumName}</strong>
                </a>
            </li>
        )
    })

    // function handleClickAlbumBiography() {
    //     setShowAlbumBiography(!showAlbumBiography);
    // }

    // Aparece as musicas de um determinado album.
    function handleClickAlbumMusics() {
        setShowAlbumMusics(!showAlbumMusics);
    }

    // Destaca um album especifico
    function handleClickFeaturedAlbum(e) {
        name = e.currentTarget.getAttribute("data-name")
        mbid = e.currentTarget.getAttribute("data-mbid")
        setAlbumName(name)
        props.loadingMusic()
        props.albumInformations(mbid)
        setShowFeaturedAlbum(true)
        setDisplayFeaturedAlbum('flex')
        setDisplayAlbumList('none')
    }
    // Apresenta a lista de albuns
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
                        <div>
                            <button className="albumBiographyBtn" onClick={handleClickAlbumMusics} disabled={!albumMusics}>Musicas do album</button>
                            {albumMusics ? null : (<Ring
                                color="#000"
                                size={31}
                            />)}
                            <div className="Musics">
                                {showAlbumMusics ? (
                                    <div className="albumMusics" style={{ backgroundColor: '#9C9C9C' }}>
                                        <Musics/>
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
        artistMbid: state.artist.artistMbid,
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
        },
        loadingMusic(){
            dispatch({type: 'LOADING_MUSIC', loadingMusic: true})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(Albums)