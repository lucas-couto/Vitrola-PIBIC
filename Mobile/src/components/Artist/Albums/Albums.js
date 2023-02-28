import React from 'react'
import { View, Text, Pressable, Image, FlatList } from 'react-native'
import { artistBody } from '../../../store/actions/artistBodyAction'
import { albumsBodyMusic } from '../../../store/actions/albumBodyAction';
import { connect } from 'react-redux'
import Musics from './Musics/Musics';
import albumAction from '../../../store/actions/albumAction'
import api from '../../../store/api';
import styles from './albumsStyle'




const getAlbum = async (props, albumMbid) => {
    props.dispatch(await albumAction(albumMbid))
    props.dispatch(albumsBodyMusic())
}
const Albums = props => {
    if (props.albumBody == 'ALBUM_MENU')
        return (Album(props))
    else
        return <Musics />
}

const Items = ({ item }, props) => {
    let albumImage = item.image ? item.image : `${api}/image/notFound/album`
    return (
        <View key={item.mbid} style={styles.album}>
            <Pressable onPress={() => getAlbum(props, item.mbid)}>
                <View style={styles.albumInformations}>
                    <Image
                        source={{ uri: `${albumImage}` }}
                        style={styles.image}
                    />
                    <Text style={styles.name}>{item.name}</Text>
                    <View></View>
                </View>
            </Pressable>
        </View>
    )
}

const Album = props => (
    <View style={styles.container}>
        <FlatList
            data={props.artistAlbums}
            renderItem={e => Items(e, props)}
            keyExtractor={item => item.mbid}
        />
    </View>
)

const mapStateToProps = (state) => {
    return {
        albumBody: state.albumBody,
        artistAlbums: state.search.artistAlbums
    }
}

export default connect(mapStateToProps)(Albums)