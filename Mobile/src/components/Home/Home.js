import React, { useEffect } from 'react'
import { TouchableWithoutFeedback, Keyboard, ActivityIndicator, ImageBackground, View, Text, Pressable, Alert, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import styles from './homeStyle'
import Header from './Header/Header'

import { artistNotFounded } from '../../messages/notFound/index'
import { disableArtistNotFoundAlert } from '../../store/actions/alertAction'

const backgroundImage = '../../assets/backgroundImages/Vitrola.png'

const Home = props => {

    const goToMainScreen = () => {
        props.dispatch(bodyHome())
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", BackHandler.exitApp);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", BackHandler.exitApp);
        }
    }, [])

    return (
        <View style={styles.content}>
            <Header />
                <ImageBackground
                    source={require(backgroundImage)}
                    opacity={0.3}
                    resizeMode="contain"
                    style={styles.imageBackground}>
                    {props.loadingHome ?
                        <Loading /> :
                        <Content props={props} artistNotFoundAlert={props.artistNotFoundAlert} />
                    }
                </ImageBackground>
        </View >
    )
}

const Loading = () => (
    <View style={styles.loading}>
        <ActivityIndicator
            size="large"
            color="#fff"
        />
    </View>
)

const Content = (props) => {
    if (props.artistNotFoundAlert)
        Alert.alert(artistNotFounded.title, artistNotFounded.message, [
            {
                text: "Ok",
                onPress: () => props.props.dispatch(disableArtistNotFoundAlert()),
                style: "default",
            },
        ])
    return <InitialText />
}

const InitialText = () => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.initialText}>
            <Text style={styles.title}>
                Bem vindo ao <Text style={styles.vitrola}>Vitrola</Text>.
            </Text>
            <View style={styles.informations}>
                <Text style={styles.text}>
                    Um aplicativo de música, onde apresenta as informações do artista e as suas redes de relacionamento.
                </Text>
                <Text style={styles.text}>
                    Para começar a utilizar, digite o nome de um artista de sua preferência.
                </Text>
            </View>
        </View>
    </TouchableWithoutFeedback>
)



const NotFoundMSG = () => (
    <View style={styles.errorMsg}>
        <Text style={styles.errorTitle}>
            Artista não encontrado!
        </Text>
        <Text style={styles.errorContent}>
            Fique tranquilo!
            A nossa inteligencia artificial colocará o artista pesquisado em nossa base de dados.
        </Text>
        <View style={styles.errorButton}>
            <Pressable onPress={() => props}>
                <Text style={{ color: '#fff' }}>OK</Text>
            </Pressable>
        </View>
    </View>
)

const mapStateToProps = (state) => {
    return {
        loadingHome: state.loading.loadingHome,
        artistNotFoundAlert: state.alert.artistNotFoundAlert
    }
}

export default connect(mapStateToProps)(Home)