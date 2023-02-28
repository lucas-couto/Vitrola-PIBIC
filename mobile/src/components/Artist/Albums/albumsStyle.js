import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 0.7,
        width: '90%',
        height: '100%',
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: '#202020',
        alignSelf: 'center'
    },
    album: {
        padding: 5
    },
    albumInformations: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        color: 'white',
        maxWidth: '60%',
        marginLeft: 30
    },
    image: {
        width: 40,
        height: 40
    },
    top: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        color: 'black'
    },
    back: {
        fontSize: 20,
        color: 'black',
        backgroundColor: 'white',
        width: '60%',
        borderRadius: 10
    },
    title: {
        flex: 0.5
    },
    previous: {
        flex: 0.3
    }
})