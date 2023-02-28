import React from 'react'
import { View, Text, Pressable, ScrollView } from 'react-native'
import { artistBody } from '../../../store/actions/artistBodyAction'
import { connect } from 'react-redux'
import styles from './biographyStyle'

const Biography = props => (
    <View style={styles.container}>
        <View style={styles.biography}>
            <ScrollView>
                <Text style={styles.text}>
                    {props.artistBiography}
                </Text>
            </ScrollView>
        </View>
    </View>
)

const mapStateToProps = (state) => {
    return {
        artistBiography: state.search.artistBiography,
    }
}

export default connect(mapStateToProps)(Biography)
