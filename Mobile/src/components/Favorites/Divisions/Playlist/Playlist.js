import React, { useEffect } from 'react'
import { View, Text, FlatList, ActivityIndicator, Pressable, Image } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlay, faPause, faTimes } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { removePlaylistMusic } from '../../../../store/actions/playlistAction';
import { playMusic, stopMusic } from '../../../../store/actions/musicAction'
import { getPlaylist } from '../../../../store/actions/playlistAction'
import recommendationAction from '../../../../store/actions/recommendationAction'
import api from '../../../../store/api'
import styles from '../divisionsStyle'

// actualMusicMbid se refere à musica que esta sendo tocada
const responsiveIcon = (props, musicName, musicMbid, musicImage, youtubeURL, albumName, isPlaying, actualMusicMbid, playlistMusics) => {
    if (isPlaying && (musicMbid == actualMusicMbid))
        return (
            <Pressable onPress={() => props.dispatch(stopMusic(musicMbid))}>
                <FontAwesomeIcon icon={faPause} style={styles.iconStyle} size={20} />
            </Pressable>
        )
    else
        return (
            <Pressable onPress={() => props.dispatch(playMusic(musicName, musicMbid, musicImage, youtubeURL, albumName, playlistMusics))}>
                <FontAwesomeIcon icon={faPlay} style={styles.iconStyle} size={20} />
            </Pressable>
        )
}

const Items = ({ item }, props) => {
    let musicImage = item.image ? item.image : `${api}/image/notFound/music`
    return (
        <View style={styles.music}>
            <View style={styles.content}>
                <Image
                    source={{ uri: `${musicImage}` }}
                    style={styles.image}
                />
                <Text style={styles.musicName}>{item.name}</Text>
                <View style={styles.buttons}>
                    {responsiveIcon(props, item.name,
                        item.mbid, item.image, item.youtubeUrl,
                        item.albumName, props.isPlaying,
                        props.actualMusicMbid, props.playlistMusics)}
                    <Pressable onPress={async () => {
                        props.dispatch(await removePlaylistMusic(item.mbid))
                        props.dispatch(await recommendationAction())
                    }}>
                        <FontAwesomeIcon icon={faTimes} style={styles.iconStyle} size={20} />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const Playlist = props => {
    useEffect(async () => {
        props.dispatch(await getPlaylist())
    }, [])
    return (
        <View style={styles.container}>
            {Content(props)}
        </View>
    )
}

const ifDontExistPlaylistMusics = () => (
    <View style={styles.initialText}>
        <Text style={{ ...styles.text, fontSize: 17 }}>
            Aqui é onde será armazenado as suas musicas preferidas!
            {'\n'}
            {'\n'}
            Para adicionar as musicas na sua playlist, clique em + na musica desejada.
        </Text>
    </View>
)

const Content = props => {
    if (props.playlistMusics && props.playlistMusics.length != 0)
        return (
            <FlatList
                data={props.playlistMusics}
                renderItem={e => Items(e, props)}
                keyExtractor={item => item.mbid}
            />
        )
    else
        return ifDontExistPlaylistMusics()
}


const mapStateToProps = (state) => {
    return {
        playlistMusics: state.playlist.playlistMusics,
        albumName: state.album.albumName,
        albumMusics: state.album.albumMusics,
        isPlaying: state.music.isPlaying,
        actualMusicMbid: state.music.musicMbid,
    }
}

export default connect(mapStateToProps)(Playlist)