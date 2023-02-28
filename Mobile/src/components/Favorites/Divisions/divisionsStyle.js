import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        textAlign: 'center',
        width: '90%',
        marginTop: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    musics: {
        padding: 5,
        width: '100%',
    },
    music: {
        width: '100%',
        paddingBottom: 10
    },
    content: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    musicName: {
        color: '#ffff',
        paddingLeft: 10,
        fontSize: 15,
        maxWidth: '50%',
        textAlign: 'center'
    },
    image: {
        width: 40,
        height: 40
    },
    top: {
        borderBottomColor: '#ffff',
        borderBottomWidth: 1,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        color: '#ffff'
    },
    iconStyle: {
        color: '#ffff',
        margin: 5
    },
    buttons: {
        flexDirection: 'row'
    },
    back: {
        fontSize: 20,
        color: 'black',
        backgroundColor: 'white',
        width: '60%',
        borderRadius: 10
    },
    initialText:{
        alignItems: 'center',
    }
})