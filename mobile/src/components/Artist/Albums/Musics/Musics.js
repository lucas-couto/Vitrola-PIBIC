import React, {useState} from 'react'
import { View, Text, Pressable, Image, FlatList } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlay, faPause, faPlus } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { playMusic, stopMusic } from '../../../../store/actions/musicAction'
import { addPlaylistMusic } from '../../../../store/actions/playlistAction'
import api from '../../../../store/api'
import styles from './musicsStyle'
import recommendationAction from '../../../../store/actions/recommendationAction'


// actualMusicMbid se refere à musica que esta sendo tocada
const responsiveIcon = (props, musicName, musicMbid, musicImage, youtubeURL, albumName, isPlaying, actualMusicMbid, albumMusics) => {
    if (isPlaying && (musicMbid == actualMusicMbid))
        return (
            <Pressable onPress={() => props.dispatch(stopMusic(musicMbid))}>
                <FontAwesomeIcon icon={faPause} style={styles.iconStyle} size={20} />
            </Pressable>
        )
    else
        return (
            <Pressable onPress={() => props.dispatch(playMusic(musicName, musicMbid, musicImage, youtubeURL, albumName, albumMusics))}>
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
                    source={{ uri: `${musicImage}`}}
                    style={styles.image}
                />
                <Text style={styles.musicName}>{item.name}</Text>
                <View style={styles.buttons}>
                    {responsiveIcon(props, item.name,
                        item.mbid, item.image, item.youtubeUrl,
                        props.albumName, props.isPlaying,
                        props.actualMusicMbid, props.albumMusics)}
                    <Pressable onPress={async () => {
                        props.dispatch(await recommendationAction())
                        props.dispatch(await addPlaylistMusic(item.name, item.mbid, item.image, item.youtubeUrl, props.albumName))
                    }}>
                        <FontAwesomeIcon icon={faPlus} style={styles.iconStyle} size={20} />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
const Musics = props => (
    <View style={styles.container}>
        <View style={styles.top}>
            <View style={styles.title}>
                <Text style={styles.albumName}>{props.albumName}</Text>
            </View>
        </View>
        <FlatList
            data={props.albumMusics}
            renderItem={e => Items(e, props)}
            keyExtractor={item => item.mbid}
        />
    </View>
)

const mapStateToProps = (state) => {
    return {
        albumName: state.album.albumName,
        albumMusics: state.album.albumMusics,
        isPlaying: state.music.isPlaying,
        actualMusicMbid: state.music.musicMbid
    }
}

export default connect(mapStateToProps)(Musics)