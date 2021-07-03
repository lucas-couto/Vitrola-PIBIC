import React from 'react'
import './Musics.css'

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
import API from '../../../store/api'
let musicName
let musicMbid
let musicYoutubeUrl
let musicImage

const Musics = props => {
    const ifMusicExists = (file) => {
        try {
            return require(`${file}`)
        } catch (e) {
            return false
        }
    }
    const { artistName, artistMbid, albumMusics, albumName, albumMbid, playingMusic, playingMusicName } = props
    const cellPhone = useMediaQuery('(max-width:575.98px)');
    const small = useMediaQuery('(min-width: 576px) and (max-width: 767.98px)');
    const medium = useMediaQuery('(min-width: 768px) and (max-width: 991.98px)');
    const large = useMediaQuery('(min-width: 992px) and (max-width: 1366px)');
    const veryLarge = useMediaQuery('(min-width: 1367px)');
    const handleAddPlaylist = e => {
        musicName = e.currentTarget.getAttribute("data-name")
        musicMbid = e.currentTarget.getAttribute("data-mbid")
        musicYoutubeUrl = e.currentTarget.getAttribute("data-urlyoutube")
        musicImage = e.currentTarget.getAttribute("data-musicdirectoryimage")
        props.playlistAction(musicMbid, musicName, musicYoutubeUrl, musicImage, albumName, albumMbid, artistName, artistMbid)
        props.recommendationAction()
    }

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
    function handlePlayMusic(e) {
        musicYoutubeUrl = e.currentTarget.getAttribute("data-urlyoutube")
        musicMbid = e.currentTarget.getAttribute("data-mbid")
        musicName = e.currentTarget.getAttribute("data-name")
        props.playAMusic(musicYoutubeUrl, musicMbid, musicName, albumName, albumMusics)
    }
    function handleStopMusic(e) {
        musicYoutubeUrl = e.currentTarget.getAttribute("data-urlyoutube")
        musicMbid = e.currentTarget.getAttribute("data-mbid")
        musicName = e.currentTarget.getAttribute("data-name")
        props.stopAMusic(musicYoutubeUrl, musicMbid, musicName, albumName, albumMusics)
    }


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
        if (music.musicMbid === props.featuredMusic) {
            return (
                <div className="featuredItem">
                    <li data-mbid={music.musicMbid} data-name={music.musicName} key={music.musicMbid}>
                        <img
                            className="musicImage"
                            src={`${API}/image/${music.musicImage}`}
                            width="30" height="30"
                            onError={e => { e.target.src = `${API}/image//music/principalMusicIcon.png` }}
                        />
                        <strong>
                            {music.musicName}
                        </strong>
                        <div className="buttonsMusic">
                            {animatedPlayPause(music.musicMbid, music.musicName, music.musicYoutubeUrl, music.albumName)}
                            <IconButton size="small" onClick={handleAddPlaylist} data-mbid={music.musicMbid} data-name={music.musicName} data-urlyoutube={music.musicYoutubeUrl} data-musicdirectoryimage={music.musicImage}>
                                {responsiveIcon()}
                            </IconButton>
                        </div>
                    </li>
                </div>
            )
        } else {
            return (
                <li data-mbid={music.musicMbid} data-name={music.musicName} key={music.musicMbid}>
                    <img
                        className="musicImage"
                        src={`${API}/image/${music.musicImage}`}
                        width="30" height="30"
                        onError={e => { e.target.src = `${API}/image//music/principalMusicIcon.png` }}
                    />
                    <strong>
                        {music.musicName}
                    </strong>
                    <div className="buttonsMusic">
                        {animatedPlayPause(music.musicMbid, music.musicName, music.musicYoutubeUrl, music.albumName)}
                        <IconButton size="small" onClick={handleAddPlaylist} data-mbid={music.musicMbid} data-name={music.musicName} data-urlyoutube={music.musicYoutubeUrl} data-musicdirectoryimage={music.musicImage}>
                            {responsiveIcon()}
                        </IconButton>
                    </div>
                </li>
            )
        }
    })

    function musicBiography() {
        return (
            <div className="musicBiography">
                <p>
                    Biografia da musica
                </p>
            </div>
        )
    }



    return (
        <div className="musicList">
            <ul>
                {List}
            </ul>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        artistName: state.artist.artistName,
        artistMbid: state.artist.artistMbid,
        albumName: state.album.albumName,
        albumMbid: state.album.albumMbid,
        albumMusics: state.album.albumMusics,
        playingMusicName: state.playMusic.musicName,
        playingMusic: state.playMusic.playingMusic,
        musicExist: state.playlist.musicExist
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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProp)(Musics)
