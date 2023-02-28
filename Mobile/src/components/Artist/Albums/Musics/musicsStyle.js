import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 0.7,
        textAlign: 'justify',
        width: '90%',
        marginTop: 20,
        borderRadius: 5,
        backgroundColor: '#202020',
        alignSelf: 'center'
    },
    music: {
        width: '100%',
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
        justifyContent: 'center',
        height: 50
    },
    albumName:{
        fontSize: 20,
        color: '#fff',
        textAlign: 'center'
    },  
    iconStyle: {
        color: '#fff',
        margin: 5
    },
    buttons: {
        flexDirection: 'row'
    },

})