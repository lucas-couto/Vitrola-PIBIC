import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    content: {
        flex: 0.8,
        justifyContent: 'space-between',
        width: '100%',
    },
    initialText: {
        flex: 0.8,
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 10,
    },
    loading:{
        flex: 0.8,
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 10,
        fontSize: 30
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        justifyContent: 'center'
    },
    vitrola:{
        color: 'red',
        fontWeight: 'bold',
        fontSize: 30,
    },
    errorMsg:{
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
        height: '35%',
        justifyContent: 'space-between'
    },
    errorTitle:{
        paddingTop: 10,
        color: '#000',
        fontSize: 20
    },
    errorContent:{
        color: '#000',
        fontSize: 12,
        textAlign: 'center'
    },
    errorButton:{
        backgroundColor: '#141414',
        width: '100%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
})