import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10
    },
    icons:{
        flexDirection: 'row',
        width: '100%', 
        justifyContent: 'space-around'
    },
    iconStyle: {
        color: 'white'
    },
    iconText: {
        color: 'white',
        fontSize: 9
    },
    icon: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        width: 30,
        height: 30,
        borderRadius: 10
    }
})