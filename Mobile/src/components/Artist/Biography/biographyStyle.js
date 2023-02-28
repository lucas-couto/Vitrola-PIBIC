import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 0.7,
        width: '90%',
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: '#202020',
        alignSelf: 'center'
    },
    biography: {
        flex: 1,
        textAlign: 'justify',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        padding: 10,
        color: 'white'
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
        fontSize: 15,
        color: 'white',
        textAlign: 'center'
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
