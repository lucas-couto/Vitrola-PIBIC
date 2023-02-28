import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 0.8,
        width: '100%',
        height: '100%',
        borderRadius: 10,
        flexShrink: 2,
        marginBottom: 10,
    },
    informations: {
        flex: 0.4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    buttons: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%'
    },
    button:{
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        width: 130,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    artistName: {
        fontSize: 25,
        color: '#ffff',
        fontWeight: 'bold',
    },
    image: {
        width: 120,
        height: 120,
    },
    separator: {
        margin: 5,
    },
    arrow: {
        fontSize: 32
    },
    iconStyle:{
        color: '#fff'
    },
    back:{
        alignSelf: 'flex-start',
        marginLeft: 20,
    },
    backgroundImage:{
        flex: 1,
        alignItems: 'center',
        width: '100%',
    }
})