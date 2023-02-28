import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexShrink: 1
  },
  inputStyle: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    margin: 3
  },
  title: {
    width: '100%',
    alignItems: 'center',
  },
  separator: {
    margin: 5,
  },
  iconStyle: {
    color: '#fff'
  },
  back: {
    alignSelf: 'flex-start',
    marginLeft: 20,
  }
})