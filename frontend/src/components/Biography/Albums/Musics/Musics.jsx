import React, { useState, useEffect } from 'react'
import './Musics.css'

import { Ring } from 'react-spinners-css';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import AddIcon from '@material-ui/icons/Add';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { grey } from '@material-ui/core/colors';
import { connect } from 'react-redux'
import { playMusic, stopMusic } from '../../../../store/actions/playMusicAction'
import { addPlaylistMusic } from '../../../../store/actions/playlistAction'
import { recommendation } from '../../../../store/actions/recommendationAction'
import API from '../../../../store/api'
let musicName
let musicMbid
let musicYoutubeUrl
let musicImage
const Musics = props => {
    const { artistName, artistMbid, albumName, albumMbid, albumMusics, playingMusic, playingMusicName, loading } = props
    const cellPhone = useMediaQuery('(max-width:575.98px)');
    const small = useMediaQuery('(min-width: 576px) and (max-width: 767.98px)');
    const medium = useMediaQuery('(min-width: 768px) and (max-width: 991.98px)');
    const large = useMediaQuery('(min-width: 992px) and (max-width: 1366px)');
    const veryLarge = useMediaQuery('(min-width: 1367px)');
    // Adicionar uma musica na playlist.
    const handleAddPlaylist = e => {
        musicName = e.currentTarget.getAttribute("data-name")
        musicMbid = e.currentTarget.getAttribute("data-mbid")
        musicYoutubeUrl = e.currentTarget.getAttribute("data-urlyoutube")
        musicImage = e.currentTarget.getAttribute("data-musicdirectoryimage")
        props.playlistAction(musicMbid, musicName, musicYoutubeUrl, musicImage, albumName, albumMbid, artistName, artistMbid)
        props.loadingRecommendation()
        props.recommendationAction()
    }

    // Logica do album em destaque
    if (props.featuredMusic) {
        let firstElement = albumMusics[0]
        for (let i = 0; i < albumMusics.length; i++) {
            const currentElement = albumMusics[i];
            if (currentElement.name === props.featuredMusic) {
                albumMusics[0] = currentElement
                albumMusics[i] = firstElement
            }
        }
    }
    // Icones responsivos
    function responsiveIcon() {
        if (cellPhone || small) {
            return (
                <AddIcon style={{ fontSize: 20, color: grey[900] }} />
            )
        } else if (medium) {
            return (
                <AddIcon style={{ fontSize: 25, color: grey[900] }} />
            )
        } else if (large) {
            return (
                <AddIcon style={{ fontSize: 30, color: grey[900] }} />
            )
        } else if (veryLarge) {
            return (
                <AddIcon style={{ fontSize: 40, color: grey[900] }} />
            )
        }
    }
    // Tocar o som da musica
    function handlePlayMusic(e) {
        musicYoutubeUrl = e.currentTarget.getAttribute("data-urlyoutube")
        musicMbid = e.currentTarget.getAttribute("data-mbid")
        musicName = e.currentTarget.getAttribute("data-name")
        props.playAMusic(musicYoutubeUrl, musicMbid, musicName, albumName, albumMusics)
    }
    // Pausar o som da musica.
    function handleStopMusic(e) {
        musicYoutubeUrl = e.currentTarget.getAttribute("data-urlyoutube")
        musicMbid = e.currentTarget.getAttribute("data-mbid")
        musicName = e.currentTarget.getAttribute("data-name")
        props.stopAMusic(musicYoutubeUrl, musicMbid, musicName, albumName, albumMusics)
    }

    // Animação do play e pause.
    function animatedPlayPause(musicMbid, musicName, urlYoutube, albumName) {
        if (playingMusic && playingMusicName == musicName) {
            if (cellPhone || small) {
                return (
                    <IconButton size="small" onClick={handleStopMusic} data-mbid={musicMbid} data-name={musicName} data-urlyoutube={urlYoutube} data-albumname={albumName}>
                        <PauseCircleOutlineIcon style={{ fontSize: 20, color: grey[900] }} />
                    </IconButton>
                )
            } else if (medium) {
                return (
                    <IconButton size="small" onClick={handleStopMusic} data-mbid={musicMbid} data-name={musicName} data-urlyoutube={urlYoutube} data-albumname={albumName}>
                        <PauseCircleOutlineIcon style={{ fontSize: 25, color: grey[900] }} />
                    </IconButton>
                )
            } else if (large) {
                return (
                    <IconButton size="small" onClick={handleStopMusic} data-mbid={musicMbid} data-name={musicName} data-urlyoutube={urlYoutube} data-albumname={albumName}>
                        <PauseCircleOutlineIcon style={{ fontSize: 30, color: grey[900] }} />
                    </IconButton>
                )
            } else if (veryLarge) {
                return (
                    <IconButton size="small" onClick={handleStopMusic} data-mbid={musicMbid} data-name={musicName} data-urlyoutube={urlYoutube} data-albumname={albumName}>
                        <PauseCircleOutlineIcon style={{ fontSize: 40, color: grey[900] }} />
                    </IconButton>
                )
            }
        } else {
            if (cellPhone || small) {
                return (
                    <IconButton size="small" onClick={handlePlayMusic} data-mbid={musicMbid} data-name={musicName} data-urlyoutube={urlYoutube} data-albumname={albumName}>
                        <PlayCircleOutlineIcon style={{ fontSize: 20, color: grey[900] }} />
                    </IconButton>
                )
            } else if (medium) {
                return (
                    <IconButton size="small" onClick={handlePlayMusic} data-mbid={musicMbid} data-name={musicName} data-urlyoutube={urlYoutube} data-albumname={albumName}>
                        <PlayCircleOutlineIcon style={{ fontSize: 25, color: grey[900] }} />
                    </IconButton>
                )
            } else if (large) {
                return (
                    <IconButton size="small" onClick={handlePlayMusic} data-mbid={musicMbid} data-name={musicName} data-urlyoutube={urlYoutube} data-albumname={albumName}>
                        <PlayCircleOutlineIcon style={{ fontSize: 30, color: grey[900] }} />
                    </IconButton>
                )
            } else if (veryLarge) {
                return (
                    <IconButton size="small" onClick={handlePlayMusic} data-mbid={musicMbid} data-name={musicName} data-urlyoutube={urlYoutube} data-albumname={albumName}>
                        <PlayCircleOutlineIcon style={{ fontSize: 40, color: grey[900] }} />
                    </IconButton>
                )
            }
        }
    }
    const List = albumMusics.map(music => {
        if (music.mbid === props.featuredMusic) {
            return (
                <div className="featuredItem">
                    <li data-mbid={music.mbid} data-name={music.name} key={music.mbid}>
                        <img
                            className="musicImage"
                            src={`${API}/image?imageDirectory=${music.image}`}
                            width="30" height="30"
                            onError={e => { e.target.src = `${API}/image?imageDirectory=/music/principalMusicIcon.png` }}
                        />
                        <strong>
                            {music.name}
                        </strong>
                        <div className="buttonsMusic">
                            {animatedPlayPause(music.mbid, music.name, music.youtubeUrl, music.albumName)}
                            <IconButton size="small" onClick={handleAddPlaylist} data-mbid={music.mbid} data-name={music.name} data-urlyoutube={music.youtubeUrl} data-musicdirectoryimage={music.image}>
                                {responsiveIcon()}
                            </IconButton>
                        </div>
                    </li>
                </div>
            )
        } else {
            return (
                <li data-mbid={music.mbid} data-name={music.name} key={music.mbid}>
                    <img
                        className="musicImage"
                        src={`${API}/image?imageDirectory=${music.image}`}
                        width="30" height="30"
                        onError={e => { e.target.src = `${API}/image?imageDirectory=/music/principalMusicIcon.png` }}
                    />
                    <strong>
                        {music.name}
                    </strong>
                    <div className="buttonsMusic">
                        {animatedPlayPause(music.mbid, music.name, music.youtubeUrl, music.albumName)}
                        <IconButton size="small" onClick={handleAddPlaylist} data-mbid={music.mbid} data-name={music.name} data-urlyoutube={music.youtubeUrl} data-musicdirectoryimage={music.image}>
                            {responsiveIcon()}
                        </IconButton>
                    </div>
                </li>
            )
        }
    })
    return (
        <div className="musicList">
            {!loading ? (
                <ul>
                    {List}
                </ul>
            ) : (
                <Ring
                    color="#fff"
                    size={30}
                />
            )}
        </div>
    )
}


const mapStateToProps = state => {
    return {
        artistName: state.artist.artistName,
        artistMbid: state.artist.artistMbid,
        albumMbid: state.album.albumMbid,
        albumName: state.album.albumName,
        albumMusics: state.album.albumMusics,
        playingMusicName: state.playMusic.musicName,
        playingMusic: state.playMusic.playingMusic,
        musicExist: state.playlist.musicExist,
        loading: state.loading.loadingMusic
    }
}

const mapDispatchToProp = dispatch => {
    return {
        playAMusic(musicYoutubeUrl, musicMbid, musicName, albumName, arrayAlbum) {
            dispatch(playMusic(musicYoutubeUrl, musicMbid, musicName, albumName, arrayAlbum))
        },
        stopAMusic(musicYoutubeUrl, musicMbid, musicName, albumName) {
            dispatch(stopMusic(musicYoutubeUrl, musicMbid, musicName, albumName))
        },
        playlistAction(musicMbid, musicName, urlYoutubeMusic, musicDirectoryImage, albumName, albumMbid, artistName, artistMbid) {
            dispatch(addPlaylistMusic(musicMbid, musicName, urlYoutubeMusic, musicDirectoryImage, albumName, albumMbid, artistName, artistMbid))
        },
        async recommendationAction() {
            dispatch(await recommendation())
        },
        loadingRecommendation(){
            dispatch({type: 'LOADING_RECOMMENDATION', loadingRecommendation: true})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProp)(Musics)
