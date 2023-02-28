import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlay, faPause, faPlus } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { playMusic, stopMusic } from '../../store/actions/musicAction'
import { actualMusic } from './config/Control'
import { addPlaylistMusic } from '../../store/actions/playlistAction'
import YoutubePlayer from "react-native-youtube-iframe";
import api from '../../store/api'
import styles from './playerStyle'

let videoId
let musicIndex
let newMusicName, newMusicMbid, newMusicImage, newVideoId
// actualMusicMbid se refere à musica que esta sendo tocada
const responsiveIcon = (props, musicName, musicMbid, musicImage, videoId, albumName, isPlaying, actualMusicMbid, albumMusics) => {
    if (isPlaying && (musicMbid == actualMusicMbid))
        return (
            <Pressable onPress={() => props.dispatch(stopMusic(musicMbid))}>
                <FontAwesomeIcon icon={faPause} style={styles.iconStyle} size={18} />
            </Pressable>
        )
    else
        return (
            <Pressable onPress={() => props.dispatch(playMusic(musicName, musicMbid, musicImage, videoId, albumName, albumMusics))}>
                <FontAwesomeIcon icon={faPlay} style={styles.iconStyle} size={18} />
            </Pressable>
        )
}

const Space = () => (
    <View style={{ margin: 5 }}></View>
)



const randomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`

}
const PlayerComponent = (props, musicName, musicMbid, musicImage, videoId, albumName, isPlaying, actualMusicMbid, existMusic, albumMusics) => {
    const [newColor, setNewColor] = useState(randomColor())
    useEffect(() => {
        setNewColor(randomColor())
    }, [musicMbid])
    const onChangeState = (e, props) => {
        if (e == 'ended') {
            musicIndex = actualMusic(albumMusics, musicMbid)
            if(musicIndex == -1)
                props.dispatch(stopMusic(musicMbid))
            else{                
                newMusicName = albumMusics[musicIndex + 1].name
                newMusicMbid = albumMusics[musicIndex + 1].mbid
                newMusicImage = albumMusics[musicIndex + 1].image
                newVideoId = albumMusics[musicIndex + 1].youtubeUrl
                props.dispatch(playMusic(newMusicName, newMusicMbid, newMusicImage, newVideoId, albumName, albumMusics))
            }
        }
    }
    musicImage = musicImage ? musicImage : `${api}/image/notFound/music`
    return (
        <View style={{ ...styles.container, backgroundColor: newColor }}>
            <View style={styles.informations}>
                <Image
                    source={{ uri: `${musicImage}` }}
                    style={styles.image}
                />
                < View style={styles.musicInformation}>
                    <Text style={styles.musicName} numberOfLines={1} ellipsizeMode={'tail'}>{musicName}</Text>
                    <Text style={styles.albumName} numberOfLines={1} ellipsizeMode={'tail'}>{albumName}</Text>
                </View >
                <View>
                    <View style={styles.buttons}>
                        {responsiveIcon(props, musicName, musicMbid, musicImage, videoId,
                            albumName, isPlaying, actualMusicMbid, albumMusics)}
                        <Space />
                        <Pressable onPress={async () => {
                            props.dispatch({ type: 'LOADING_FAVORITES' })
                            props.dispatch(await addPlaylistMusic(musicName, musicMbid, musicImage, videoId, albumName))
                        }}>
                            <FontAwesomeIcon icon={faPlus} style={styles.iconStyle} size={18} />
                        </Pressable>
                    </View>
                </View>
            </View >
            <View style={styles.player}>
                <YoutubePlayer
                    height={0}
                    play={isPlaying}
                    videoId={videoId}
                    playListStartIndex={0}
                    onChangeState={e => onChangeState(e, props)}
                    onReady={e => console.log('ready: ' + e)}
                />
            </View>
        </View >
    )
}

const Player = props => {
    videoId = null
    if (props.youtubeURL) {
        let cutStr = props.youtubeURL.split("=")
        videoId = cutStr[1]
    }
    if (props.existMusic)
        return PlayerComponent(props, props.musicName, props.musicMbid,
            props.musicImage, videoId, props.albumName, props.isPlaying, props.actualMusicMbid,
            props.existMusic, props.albumMusics)
    else
        return null
}

const mapStateToProps = (state) => {
    return {
        musicName: state.music.musicName,
        musicMbid: state.music.musicMbid,
        musicImage: state.music.musicImage,
        youtubeURL: state.music.youtubeURL,
        albumName: state.music.albumName,
        isPlaying: state.music.isPlaying,
        existMusic: state.music.existMusic,
        actualMusicMbid: state.music.musicMbid,
        albumMusics: state.music.albumMusics
    }
}

export default connect(mapStateToProps)(Player)