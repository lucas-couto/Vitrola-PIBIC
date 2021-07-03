import React from 'react'
import './UserPlaylist.css'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import ClearIcon from '@material-ui/icons/Clear';
import { grey } from '@material-ui/core/colors';
import { connect } from 'react-redux'
import { playMusic, stopMusic } from '../../../store/actions/playMusicAction'
import { removePlaylistMusic } from '../../../store/actions/playlistAction'
import { recommendation } from '../../../store/actions/recommendationAction'
import API from '../../../store/api'

let musicMbid
let musicName
let musicYoutubeUrl
let albumName

const UserPlaylist = props => {
    const ifMusicExists = (file) => {
        try {
            console.log(require(file))
            // return require(file)
        } catch (e) {
            return false
        }
    }
    const cellPhone = useMediaQuery('(max-width:575.98px)');
    const small = useMediaQuery('(min-width: 576px) and (max-width: 767.98px)');
    const medium = useMediaQuery('(min-width: 768px) and (max-width: 991.98px)');
    const large = useMediaQuery('(min-width: 992px) and (max-width: 1366px)');
    const veryLarge = useMediaQuery('(min-width: 1367px)');
    const { playlistMusic, playingMusic, playingMusicName } = props
    function ifPlaylistExist() {
        const List = playlistMusic.map(music => {
            if (music.musicMbid == props.featuredMusic) {
                return (
                    <div className="featuredMusic">
                        <li data-mbid={music.musicMbid} data-name={music.musicName} data-albumname={music.albumName} key={music.musicMbid}>
                            <img
                                className="musicImage"
                                src={`${API}/image?imageDirectory=${music.musicImage}`}
                                width="30" height="30"
                                onError={e => { e.target.src = `${API}/image?imageDirectory=/music/principalMusicIcon.png` }}
                            />
                            <div className="musicInfo">
                                <strong>
                                    {music.musicName}
                                </strong>
                                <label>
                                    {music.artistName}
                                </label>
                            </div>
                            <div className="buttonsMusic">
                                {animatedPlayPause(music.musicMbid, music.musicName, music.musicYoutubeUrl, music.albumName)}
                                <IconButton size="small" onClick={removeMusic} data-mbid={music.musicMbid} data-name={music.musicName} data-urlyoutube={music.musicYoutubeUrl} data-directoryimage={music.musicDirectoryImage} data-albumname={music.albumName} data-albummbid={music.albumMbid} data-artistmbid={music.artistMbid}>
                                    <ClearIcon style={{ fontSize: 30, color: grey[900] }} />
                                </IconButton>
                            </div>
                        </li>
                    </div>
                )
            }
            return (
                <li data-mbid={music.musicMbid} data-name={music.musicName} data-albumname={music.albumName} key={music.musicMbid}>
                    <img
                        className="musicImage"
                        src={`${API}/image?imageDirectory=${music.musicImage}`}
                        width="30" height="30"
                        onError={e => { e.target.src = `${API}/image?imageDirectory=/music/principalMusicIcon.png` }}
                    />
                    <div className="musicInfo">
                        <strong>
                            {music.musicName}
                        </strong>
                        <label>
                            {music.artistName}
                        </label>
                    </div>
                    <div className="buttonsMusic">
                        {animatedPlayPause(music.musicMbid, music.musicName, music.musicYoutubeUrl, music.albumName)}
                        <IconButton size="small" onClick={removeMusic} data-mbid={music.musicMbid} data-name={music.musicName} data-urlyoutube={music.musicYoutubeUrl} data-directoryimage={music.musicDirectoryImage} data-albumname={music.albumName} data-albummbid={music.albumMbid} data-artistmbid={music.artistMbid}>
                            {responsiveIcon()}
                        </IconButton>
                    </div>
                </li>
            )
        })
        return (
            List
        )
    }

    function ifPlaylistNotExist() {
        return (
            <label>
                Aqui é a sua playlist, para adicionar uma musica
                aperte no botão + , do lado da musica desejada, para
                adicionar a playlist
            </label>
        )
    }

    function responsiveIcon() {
        if (cellPhone || small) {
            return (
                <ClearIcon style={{ fontSize: 20, color: grey[900] }} />
            )
        } else if (medium) {
            return (
                <ClearIcon style={{ fontSize: 25, color: grey[900] }} />
            )
        } else if (large) {
            return (
                <ClearIcon style={{ fontSize: 30, color: grey[900] }} />
            )
        } else if (veryLarge) {
            return (
                <ClearIcon style={{ fontSize: 40, color: grey[900] }} />
            )
        }
    }

    function clickStopMusic(e) {
        musicMbid = e.currentTarget.getAttribute("data-mbid")
        musicName = e.currentTarget.getAttribute("data-name")
        musicYoutubeUrl = e.currentTarget.getAttribute("data-urlyoutube")
        albumName = e.currentTarget.getAttribute("data-albumname")
        props.stopAMusic(musicYoutubeUrl, musicMbid, musicName, albumName, playlistMusic)
    }

    function clickPlayMusic(e) {
        musicMbid = e.currentTarget.getAttribute("data-mbid")
        musicName = e.currentTarget.getAttribute("data-name")
        musicYoutubeUrl = e.currentTarget.getAttribute("data-urlyoutube")
        albumName = e.currentTarget.getAttribute("data-albumname")
        props.playAMusic(musicYoutubeUrl, musicMbid, musicName, albumName, playlistMusic)
    }

    function removeMusic(e) {
        musicMbid = e.currentTarget.getAttribute("data-mbid")
        props.removePlaylistMusicAction(musicMbid)
        props.recommendationAction()
    }

    function animatedPlayPause(musicMbid, musicName, urlYoutube, albumName) {
        if (playingMusic && playingMusicName == musicName) {
            if (cellPhone || small) {
                return (
                    <IconButton size="small" onClick={clickStopMusic} data-mbid={musicMbid} data-name={musicName} data-urlyoutube={urlYoutube} data-albumname={albumName}>
                        <PauseCircleOutlineIcon style={{ fontSize: 20, color: grey[900] }} />
                    </IconButton>
                )
            } else if (medium) {
                return (
                    <IconButton size="small" onClick={clickStopMusic} data-mbid={musicMbid} data-name={musicName} data-urlyoutube={urlYoutube} data-albumname={albumName}>
                        <PauseCircleOutlineIcon style={{ fontSize: 25, color: grey[900] }} />
                    </IconButton>
                )
            } else if (large) {
                return (
                    <IconButton size="small" onClick={clickStopMusic} data-mbid={musicMbid} data-name={musicName} data-urlyoutube={urlYoutube} data-albumname={albumName}>
                        <PauseCircleOutlineIcon style={{ fontSize: 30, color: grey[900] }} />
                    </IconButton>
                )
            } else if (veryLarge) {
                return (
                    <IconButton size="small" onClick={clickStopMusic} data-mbid={musicMbid} data-name={musicName} data-urlyoutube={urlYoutube} data-albumname={albumName}>
                        <PauseCircleOutlineIcon style={{ fontSize: 40, color: grey[900] }} />
                    </IconButton>
                )
            }
        } else {
            if (cellPhone || small) {
                return (
                    <IconButton size="small" onClick={clickPlayMusic} data-mbid={musicMbid} data-name={musicName} data-urlyoutube={urlYoutube} data-albumname={albumName}>
                        <PlayCircleOutlineIcon style={{ fontSize: 20, color: grey[900] }} />
                    </IconButton>
                )
            } else if (medium) {
                return (
                    <IconButton size="small" onClick={clickPlayMusic} data-mbid={musicMbid} data-name={musicName} data-urlyoutube={urlYoutube} data-albumname={albumName}>
                        <PlayCircleOutlineIcon style={{ fontSize: 25, color: grey[900] }} />
                    </IconButton>
                )
            } else if (large) {
                return (
                    <IconButton size="small" onClick={clickPlayMusic} data-mbid={musicMbid} data-name={musicName} data-urlyoutube={urlYoutube} data-albumname={albumName}>
                        <PlayCircleOutlineIcon style={{ fontSize: 30, color: grey[900] }} />
                    </IconButton>
                )
            } else if (veryLarge) {
                return (
                    <IconButton size="small" onClick={clickPlayMusic} data-mbid={musicMbid} data-name={musicName} data-urlyoutube={urlYoutube} data-albumname={albumName}>
                        <PlayCircleOutlineIcon style={{ fontSize: 40, color: grey[900] }} />
                    </IconButton>
                )
            }
        }
    }

    return (
        <div className="playlistMusic">
            {playlistMusic.length != 0 ? ifPlaylistExist() : ifPlaylistNotExist()}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        playlistMusic: state.playlist.playlistMusic,
        musicExist: state.playlist.musicExist,
        playingMusic: state.playMusic.playingMusic,
        playingMusicName: state.playMusic.musicName
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
        removePlaylistMusicAction(musicMbid) {
            dispatch(removePlaylistMusic(musicMbid))
        },
        async recommendationAction() {
            dispatch(await recommendation())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(UserPlaylist)