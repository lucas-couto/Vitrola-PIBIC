import React, { useState } from "react"
import { View, TextInput } from "react-native"
import searchAction from "../../../store/actions/searchAction"
import graphAction from "../../../store/actions/graphAction"
import { artistBody } from "../../../store/actions/artistBodyAction"
import { connect } from 'react-redux'
import styles from './headerStyle'
import { loadingHome } from "../../../store/actions/loadingAction"

const Header = props => {
    const [value, setValue] = useState(null)
    const getArtist = async () => {
        props.dispatch(loadingHome())
        props.dispatch(artistBody())
        props.dispatch(await searchAction(value))
        props.dispatch(await graphAction(value, null))
    }
    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Pesquisar"
                    onChangeText={setValue}
                    onSubmitEditing={getArtist} />
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        artistMbid: state.search.artistMbid,
    }
}

export default connect(mapStateToProps)(Header)