import React, { useEffect, useState } from 'react'
import { ImageBackground, Text, View, Image, Pressable, BackHandler } from "react-native"
import { artistBodyBiography, artistBodyAlbums } from '../../store/actions/artistBodyAction'
import { albumsBody } from '../../store/actions/albumBodyAction'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { bodyHome } from '../../store/actions/bodyAction'
import Biography from "./Biography/Biography"
import Albums from './Albums/Albums'
import api from '../../store/api'
import styles from './artistStyle'

const backgroundImage = '../../assets/backgroundImages/Artist.png'

const Artist = props => {
    let artistImage = props.artistImage
    const [backgroundColorBio, setBackgroundColorBio] = useState('#fff')
    const [backgroundColorAlbum, setBackgroundColorAlbum] = useState('#fff')

    const goToMainScreen = () => {
        props.dispatch(bodyHome())
        return true;
    }

    useEffect(() => {
        if (artistImage)
            artistImage = `${api}/image/notFound/artist`
            
        BackHandler.addEventListener("hardwareBackPress", goToMainScreen);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", goToMainScreen);
        }
    }, [])

    useEffect(() => {
        if (props.artistBody == 'ARTIST_BIOGRAPHY') {
            setBackgroundColorBio('#752e2b')
            setBackgroundColorAlbum('#fff')
        }
        else if (props.artistBody == 'ARTIST_ALBUMS') {
            setBackgroundColorBio('#fff')
            setBackgroundColorAlbum('#752e2b')
        }
    }, [props.artistBody])

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
                <View style={styles.informations}>
                    <Image
                        source={{ uri: `${artistImage}` }}
                        style={styles.image}
                    />
                    <Text style={styles.artistName}>{
                        props.artistName ? props.artistName : 'Nome do artista'
                    }
                    </Text>
                </View>
                <View style={styles.buttons}>
                    <Pressable onPress={() => {
                        props.dispatch(artistBodyBiography())
                    }}>
                        <View style={{ ...styles.button, backgroundColor: backgroundColorBio }}>
                            <Text>Biografia</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => {
                        props.dispatch(artistBodyAlbums())
                        props.dispatch(albumsBody())
                    }}>
                        <View style={{ ...styles.button, backgroundColor: backgroundColorAlbum }}>
                            <Text>Álbuns</Text>
                        </View>
                    </Pressable>
                </View>
                {artistBody(props)}
            </ImageBackground>
        </View>
    )
}

const artistBody = props => {
    if (props.artistBody == 'ARTIST_BIOGRAPHY')
        return <Biography />
    else if (props.artistBody == 'ARTIST_ALBUMS')
        return <Albums />
}

const mapStateToProps = (state) => {
    return {
        artistBody: state.artistBody,
        artistName: state.search.artistName,
        artistMbid: state.search.artistMbid,
        artistImage: state.search.artistImage
    }
}

export default connect(mapStateToProps)(Artist)

