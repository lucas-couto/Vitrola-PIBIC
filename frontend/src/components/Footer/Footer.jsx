import React, { useState, useEffect } from 'react'
import './Footer.css'

import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import FastRewind from '@material-ui/icons/FastRewind';
import FastForward from '@material-ui/icons/FastForward';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import { grey } from '@material-ui/core/colors';
import ReactPlayer from 'react-player'
import Duration from './adjusts/Duration'

import { connect } from 'react-redux'
import { playMusic, stopMusic } from '../../store/actions/playMusicAction'
import { actualMusic } from './adjusts/Controll'
let index
const Footer = props => {
    const cellPhone = useMediaQuery('(max-width:575.98px)');
    const small = useMediaQuery('(min-width: 576px) and (max-width: 767.98px)');
    const medium = useMediaQuery('(min-width: 768px) and (max-width: 991.98px)');
    const large = useMediaQuery('(min-width: 992px) and (max-width: 1366px)');
    const veryLarge = useMediaQuery('(min-width: 1367px)');
    const { musicYoutubeUrl, musicMbid, musicName, albumName, playingMusic, musicArray } = props
    const [duration, setDuration] = useState(false)
    const [progress, setProgress] = useState(false)
    const [volume, setVolume] = useState(0.5)
    const [muttedVolume, setMuttedVolume] = useState(false)


    //Animações para o player
    const handleProgress = state => { setProgress(state.played) }
    const handleDuration = seconds => { setDuration(seconds) }
    const handleVolumeChange = e => { setVolume(parseFloat(e.target.value)) }
    const handleVolumeMutted = () => { setMuttedVolume(!muttedVolume) }
    const animatedVolume = (size) => {
        if (muttedVolume) {
            return (
                <VolumeOffIcon style={{ fontSize: size, color: grey[50] }} />
            )
        } else {
            if (volume <= 0.5 && volume > 0) {
                return (
                    <VolumeDownIcon style={{ fontSize: size, color: grey[50] }} />
                )
            } else if (volume > 0.5 && volume <= 1) {
                return (
                    <VolumeUpIcon style={{ fontSize: size, color: grey[50] }} />
                )
            } else if (volume == 0) {
                return (
                    <VolumeMuteIcon style={{ fontSize: size, color: grey[50] }} />
                )
            }
        }
    }
    const animatedPlayPause = () => {
        if (!playingMusic) {
            if(cellPhone || small){
                return (
                    <PlayArrow style={{color: grey[50], fontSize: 25 }}/>
                )
            }else if(medium){
                return (
                    <PlayArrow style={{color: grey[50], fontSize: 30 }}/>
                )
            }else if(large){
                return (
                    <PlayArrow style={{color: grey[50], fontSize: 40 }}/>
                )
            }else if(veryLarge){
                return (
                    <PlayArrow style={{color: grey[50], fontSize: 50 }}/>
                )
            }
        }
        else {
            if(cellPhone || small){
                return (
                    <Pause style={{color: grey[50], fontSize: 25 }}/>
                )
            }else if(medium){
                return (
                    <Pause style={{color: grey[50], fontSize: 30 }}/>
                )
            }else if(large){
                return (
                    <Pause style={{color: grey[50], fontSize: 40 }}/>
                )
            }else if(veryLarge){
                return (
                    <Pause style={{color: grey[50], fontSize: 50 }}/>
                )
            }
        }
    }
    const animatedBack = () => {
        index = actualMusic(musicArray, musicMbid)
        if (index > 0) {
            if(cellPhone || small){
                return (
                    <FastRewind style={{color: grey[50], fontSize: 15 }}/>
                )
            }else if(medium){
                return (
                    <FastRewind style={{color: grey[50], fontSize: 25 }}/>
                )
            }else if(large){
                return (
                    <FastRewind style={{color: grey[50], fontSize: 35 }}/>
                )
            }else if(veryLarge){
                return (
                    <FastRewind style={{color: grey[50], fontSize: 45 }}/>
                )
            }
        }
    }
    const animatedNext = () => {
        index = actualMusic(musicArray, musicMbid)
        if (musicArray && musicArray.length != 0 && index < musicArray.length - 1) {
            if(cellPhone || small){
                return (
                    <FastForward style={{color: grey[50], fontSize: 15 }}/>
                )
            }else if(medium){
                return (
                    <FastForward style={{color: grey[50], fontSize: 25 }}/>
                )
            }else if(large){
                return (
                    <FastForward style={{color: grey[50], fontSize: 35 }}/>
                )
            }else if(veryLarge){
                return (
                    <FastForward style={{color: grey[50], fontSize: 45 }}/>
                )
            }
        }
    }
    const responsiveVolume = () =>{
        if(cellPhone){
            return(
                animatedVolume(15)
            )
        }else if(medium){
            return(
                animatedVolume(25)
            )
        }else if(large){
            return(
                animatedVolume(35)
            )
        }else if(veryLarge){
            return(
                animatedVolume(45)
            )
        }
    }

    // Tocar a proxima musica
    const handleNextMusic = () => {
        if(musicArray && musicArray.length > 1){
            index = actualMusic(musicArray, musicMbid)
            props.playAMusic(musicArray[index + 1].youtubeUrl, musicArray[index + 1].mbid, musicArray[index + 1].name, albumName, musicArray)
        }
    }
    // Tocar a musica anterior
    const handleBackMusic = () => {
        index = actualMusic(musicArray, musicMbid)
        props.playAMusic(musicArray[index - 1].youtubeUrl, musicArray[index - 1].mbid, musicArray[index - 1].name, albumName, musicArray)
    }

    return (
        <React.Fragment>
            <div className="Footer">
                <div className="playPause">
                    <IconButton size="small" disabled={!musicYoutubeUrl} onClick={handleBackMusic}>
                        {animatedBack()}
                    </IconButton>
                    <IconButton disabled={!musicYoutubeUrl} onClick={() => playingMusic ? props.stopAMusic(musicYoutubeUrl, musicMbid, musicName, albumName, musicArray) : props.playAMusic(musicYoutubeUrl, musicMbid, musicName, albumName, musicArray)}>
                        {animatedPlayPause()}
                    </IconButton>
                    <IconButton size="small" disabled={!musicYoutubeUrl} onClick={handleNextMusic}>
                        {animatedNext()}
                    </IconButton>
                </div>
                <div className="musicAlbum">
                    <div className="Music">
                        <label id="Music">{musicName ? musicName : 'Nome da Musica'}</label>
                    </div>
                    <div className="Album">
                        <label id="Album">{albumName ? albumName : 'Nome do Album'}</label>
                    </div>
                </div>
                <div className="controls">
                    <div className="progress">
                        <strong><Duration seconds={duration * progress} /> </strong><progress max={1} value={progress} /><strong> <Duration seconds={duration} /></strong>
                    </div>
                    <div className="volume">
                        <IconButton size="small" disabled={musicYoutubeUrl ? false : true} onClick={handleVolumeMutted}>
                            {responsiveVolume()}
                        </IconButton>
                        <input type='range' min={0} max={1} step='any' value={volume} onChange={handleVolumeChange} />
                    </div>
                </div>
            </div>
            <div style={{ display: 'none' }}>
                <ReactPlayer
                    url={musicYoutubeUrl}
                    playing={playingMusic}
                    onProgress={handleProgress}
                    onDuration={handleDuration}
                    volume={volume}
                    muted={muttedVolume}
                    onEnded={handleNextMusic}
                />
            </div>
        </React.Fragment>
    )
}


const mapStateToProps = state => {
    return {
        musicYoutubeUrl: state.playMusic.musicYoutubeUrl,
        musicMbid: state.playMusic.musicMbid,
        musicName: state.playMusic.musicName,
        albumName: state.playMusic.albumName,
        playingMusic: state.playMusic.playingMusic,
        musicArray: state.playMusic.musicArray
    }
}

const mapDispatchToProp = dispatch => {
    return {
        playAMusic(musicYoutubeUrl, musicMbid, musicName, albumName, musicArray) {
            dispatch(playMusic(musicYoutubeUrl, musicMbid, musicName, albumName, musicArray))
        },
        stopAMusic(musicYoutubeUrl, musicMbid, musicName, albumName, musicArray) {
            dispatch(stopMusic(musicYoutubeUrl, musicMbid, musicName, albumName, musicArray))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(Footer)