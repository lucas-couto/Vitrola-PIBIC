import React, { useState, useEffect } from 'react'
import { ImageBackground, View, Text, Pressable, BackHandler } from 'react-native'
import { favoriteBodyPlaylist, favoriteBodyRecommendation } from '../../store/actions/favoriteBodyAction'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faMusic } from '@fortawesome/free-solid-svg-icons'
import { bodyHome } from '../../store/actions/bodyAction'
import Playlist from './Divisions/Playlist/Playlist'
import Recommendations from './Divisions/Recommendations/Recommendations'
import styles from './favoritesStyle'


const backgroundImage = '../../assets/backgroundImages/Favorites.png'

const Favorites = props => {
    const [backgroundColorPlaylist, setBackgroundColorPlaylist] = useState('#fff')
    const [backgroundColorRecommendations, setBackgroundColorRecommendations] = useState('#fff')

    const goToMainScreen = () =>{
        props.dispatch(bodyHome())
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", goToMainScreen);
        return () =>{
            BackHandler.removeEventListener("hardwareBackPress", goToMainScreen);
        }
    }, [])
    
    useEffect(() => {
        if (props.favoriteBody == 'FAVORITE_PLAYLIST') {
            setBackgroundColorPlaylist('#752e2b')
            setBackgroundColorRecommendations('white')
        }
        else if (props.favoriteBody == 'FAVORITE_RECOMMENDATION') {
            setBackgroundColorPlaylist('white')
            setBackgroundColorRecommendations('#752e2b')
        }
        else {
            setBackgroundColorPlaylist('white')
            setBackgroundColorRecommendations('white')
        }
    }, [props.favoriteBody])

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require(backgroundImage)}
                opacity={0.3}
                resizeMode='cover'
                style={styles.backgroundImage}
            >
                <View style={styles.back}>
                    <Pressable onPress={() => props.dispatch(bodyHome())}>
                        <FontAwesomeIcon icon={faArrowLeft} style={styles.iconStyle} size={30} />
                    </Pressable>
                </View>
                <Text style={styles.title}>Favoritas</Text>
                <View style={styles.buttons}>
                    <Pressable onPress={() => {
                        setBackgroundColorPlaylist('#752e2b')
                        setBackgroundColorRecommendations('#fff')
                        props.dispatch(favoriteBodyPlaylist())
                    }}>
                        <View style={{ ...styles.button, backgroundColor: backgroundColorPlaylist }}>
                            <Text>Playlist</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => {
                        setBackgroundColorPlaylist('#fff')
                        setBackgroundColorRecommendations('#752e2b')
                        props.dispatch(favoriteBodyRecommendation())
                    }}>
                        <View style={{ ...styles.button, backgroundColor: backgroundColorRecommendations }}>
                            <Text>Recomendações</Text>
                        </View>
                    </Pressable>
                </View>
                {(Content(props.favoriteBody))}
            </ImageBackground>
        </View>
    )
}


const InitialContent = () => {
    return (
        <View style={styles.initialText}>
            <Text style={styles.text}>
                Aqui estão as musicas de sua preferencia!
                {'\n'}
                {'\n'}
                Para ir a sua playlist, clique no botão Playlist
                {'\n'}
                {'\n'}
                E para ir as musicas recomendadas, clique em Recomendações
            </Text>
        </View>
    )
}

const Content = body => {
    if (body == 'FAVORITE_PLAYLIST')
        return <Playlist />
    else if (body == 'FAVORITE_RECOMMENDATION')
        return <Recommendations />
    else
        return <InitialContent />
}

const mapStateToProps = (state) => {
    return {
        favoriteBody: state.favoriteBody,
        body: state.body
    }
}

export default connect(mapStateToProps)(Favorites)