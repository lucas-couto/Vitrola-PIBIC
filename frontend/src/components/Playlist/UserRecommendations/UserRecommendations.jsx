import React from 'react'
import { useEffect } from 'react'
import './UserRecommendations.css'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import AddIcon from '@material-ui/icons/Add';
import { grey } from '@material-ui/core/colors';
import { connect } from 'react-redux'
import { playMusic, stopMusic } from '../../../store/actions/playMusicAction'
import { addPlaylistMusic } from '../../../store/actions/playlistAction'
import { recommendation } from '../../../store/actions/recommendationAction'
let musicMbid
let musicName
let musicYoutubeUrl
let albumName
let albumMbid
let musicImage
let artistMbid
let artistName
const UserRecommendations = props => {
    const cellPhone = useMediaQuery('(max-width:575.98px)');
    const small = useMediaQuery('(min-width: 576px) and (max-width: 767.98px)');
    const medium = useMediaQuery('(min-width: 768px) and (max-width: 991.98px)');
    const large = useMediaQuery('(min-width: 992px) and (max-width: 1366px)');
    const veryLarge = useMediaQuery('(min-width: 1367px)');
    const { recommendationsMusic, playingMusic, playingMusicName } = props
    useEffect(() => {
        props.recommendationAction()
    }, [])
    function Recommendations() {
        if (recommendationsMusic) {
            return ifPlaylistExist()
        } else {
            return ifPlaylistNotExist()
        }
    }
    function ifPlaylistExist() {
        const List = recommendationsMusic.map(music => {
            return (
                <li data-mbid={music.musicMbid} data-name={music.musicName} data-albumname={music.musicAlbumName} key={music.musicMbid}>
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
                            {music.musicArtistName}
                        </label>
                    </div>
                    <div className="buttonsMusic">
                        {animatedPlayPause(music.musicMbid, music.musicName, music.musicYoutubeUrl, music.musicAlbumName)}
                        <IconButton
                            size="small"
                            onClick={handleAddPlaylist}
                            data-mbid={music.musicMbid}
                            data-name={music.musicName}
                            data-urlyoutube={music.musicYoutubeUrl}
                            data-directoryimage={music.musicDirectoryImage}
                            data-albumname={music.musicAlbumName}
                            data-albummbid={music.musicAlbumMbid}
                            data-artistmbid={music.musicArtistMbid}
                            data-artistname={music.musicArtistName}
                        >
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
                Aqui são suas musicas recomendadas, que são escolhidas de acordo com o seu gosto musical!
                Para iniciar as recommendações adicione musicas na sua playlist
            </label>
        )
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
    function clickStopMusic(e) {
        musicMbid = e.currentTarget.getAttribute("data-mbid")
        musicName = e.currentTarget.getAttribute("data-name")
        musicYoutubeUrl = e.currentTarget.getAttribute("data-urlyoutube")
        albumName = e.currentTarget.getAttribute("data-albumname")
        props.stopAMusic(musicYoutubeUrl, musicMbid, musicName, albumName, recommendationsMusic)
    }

    function clickPlayMusic(e) {
        musicMbid = e.currentTarget.getAttribute("data-mbid")
        musicName = e.currentTarget.getAttribute("data-name")
        musicYoutubeUrl = e.currentTarget.getAttribute("data-urlyoutube")
        albumName = e.currentTarget.getAttribute("data-albumname")
        props.playAMusic(musicYoutubeUrl, musicMbid, musicName, albumName, recommendationsMusic)
    }
    const handleAddPlaylist = e => {
        musicName = e.currentTarget.getAttribute("data-name")
        musicMbid = e.currentTarget.getAttribute("data-mbid")
        musicYoutubeUrl = e.currentTarget.getAttribute("data-urlyoutube")
        musicImage = e.currentTarget.getAttribute("data-directoryimage")
        artistMbid = e.currentTarget.getAttribute("data-artistmbid")
        artistName = e.currentTarget.getAttribute("data-artistname")
        albumMbid = e.currentTarget.getAttribute("data-albummbid")
        albumName = e.currentTarget.getAttribute("data-albumname")
        props.playlistAction(musicMbid, musicName, musicYoutubeUrl, musicImage, albumName, albumMbid, artistName, artistMbid)
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
        <div className="playlistRecommendations">
            {Recommendations()}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        recommendationsMusic: state.recommendation.recommendationMusic,
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
        playlistAction(musicMbid, musicName, urlYoutubeMusic, musicDirectoryImage, albumName, albumMbid, artistName, artistMbid) {
            dispatch(addPlaylistMusic(musicMbid, musicName, urlYoutubeMusic, musicDirectoryImage, albumName, albumMbid, artistName, artistMbid))
        },
        async recommendationAction() {
            dispatch(await recommendation())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(UserRecommendations)