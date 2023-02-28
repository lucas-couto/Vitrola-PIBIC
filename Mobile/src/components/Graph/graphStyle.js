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
    node: {
      width: 50,
      height: 50,
      borderRadius: 5,
      backgroundColor: 'white',
      top: '50%',
      left: '50%'
    },
    image: {
      width: 120,
      height: 120
    },
    backgroundImage: {
      flex: 1,
      width: '100%',
    },
  });