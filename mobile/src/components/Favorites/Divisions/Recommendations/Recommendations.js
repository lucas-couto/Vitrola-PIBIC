import React, { useEffect } from 'react'
import { View, Text, FlatList, Pressable, Image, ActivityIndicator } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlay, faPause, faPlus } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'

import { addPlaylistMusic } from '../../../../store/actions/playlistAction'
import { playMusic, stopMusic } from '../../../../store/actions/musicAction'
import recommendationAction from '../../../../store/actions/recommendationAction'
import { loadingRecommendations } from '../../../../store/actions/loadingAction'

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

const Loading = () => (
    <View style={styles.loading}>
        <ActivityIndicator
            size="large"
            color="#fff"
        />
    </View>
)


const Items = ({ item }, props) => {
    let musicImage = item.music.image ? item.music.image : `${api}/image/notFound/music`
    return (
        <View style={styles.music}>
            <View style={styles.content}>
                <Image
                    source={{ uri: `${musicImage}` }}
                    style={styles.image}
                />
                <Text style={styles.musicName}>{item.music.name}</Text>
                <View style={styles.buttons}>
                    {responsiveIcon(props, item.music.name,
                        item.music.mbid, item.music.image, item.music.youtubeUrl,
                        item.album.name, props.isPlaying,
                        props.actualMusicMbid, props.playlistMusics)}
                    <Pressable onPress={async () => {
                        props.dispatch(await addPlaylistMusic(item.music.name, item.music.mbid, item.music.image, item.music.youtubeUrl, item.album.name))
                        props.dispatch(await recommendationAction())
                    }}>
                        <FontAwesomeIcon icon={faPlus} style={styles.iconStyle} size={20} />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const gettingRecommendations = async (props) => {
    if (props.playlistMusics && props.playlistMusics.length != 0 && props.recommendationMusics) {
        props.dispatch(loadingRecommendations())
        props.dispatch(await recommendationAction())
    }
}

const Recommendations = props => {
    useEffect(async () => {
        gettingRecommendations(props)
    }, [props.recommendationMusics])
    return (
        <View style={styles.container}>
            {Content(props)}
        </View>
    )
}

const Content = props => {
    if (props.loadingRecommendations)
        return <Loading />
    else {
        if (props.recommendationMusics && props.recommendationMusics.length != 0)
            return <IfExistRecommendationMusics recommendationMusics={props.recommendationMusics} props={props} />
        else
            return <IfDontExistRecommendationMusics />
    }
}

const IfDontExistRecommendationMusics = () => (
    <View style={styles.initialText}>
        <Text style={{ ...styles.text, fontSize: 17 }}>
            Aqui aparecerão musicas recomendadas de acordo com o seu gosto musical!
            {'\n'}
            {'\n'}
            Para iniciar as recomendações adicione musicas na sua playlist!
        </Text>
    </View>
)

const IfExistRecommendationMusics = (props) => (
    <FlatList
        data={props.recommendationMusics}
        renderItem={e => Items(e, props.props)}
        keyExtractor={item => item.music.mbid}
    />
)



const mapStateToProps = (state) => {
    return {
        albumName: state.album.albumName,
        albumMusics: state.album.albumMusics,
        isPlaying: state.music.isPlaying,
        actualMusicMbid: state.music.musicMbid,
        recommendationMusics: state.recommendations.recommendationMusics,
        playlistMusics: state.playlist.playlistMusics,
        loadingRecommendations: state.loading.loadingRecommendations
    }
}

export default connect(mapStateToProps)(Recommendations)