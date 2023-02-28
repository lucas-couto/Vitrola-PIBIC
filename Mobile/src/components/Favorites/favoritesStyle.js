import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 0.8,
        width: '100%',
        height: '100%',
        flexShrink: 2,
        marginBottom: 10,
    },
    title: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
        padding: 10
    },
    buttons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    button:{
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        width: 150,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
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
    },
    text:{
        color: '#fff',
        fontSize: 17
    },
    initialText:{
        marginTop: 20,
        alignItems: 'center',
        width: '90%'
    }
})

