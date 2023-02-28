import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 0.09,
        borderRadius: 5,
        width: '95%'
    },
    informations: {
        height: '100%',
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        width: 40,
        height: 40,
    },
    player: {
        transform: [{ scale: 0 }],
    },
    buttons: {
        flexDirection: 'row',
        width: '33%',
    },
    musicName: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    albumName: {
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: 'center',
    },
    musicInformation: {
        alignItems: 'center',
        maxWidth: '70%'
    }
})