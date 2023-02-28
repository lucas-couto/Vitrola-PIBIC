import {createStore, combineReducers} from 'redux'
import bodyReducer from './reducers/bodyReducer'
import artistBodyReducer from './reducers/artistBodyReducer'
import albumBodyReducer from './reducers/albumBodyReducer'
import searchReducer from './reducers/searchReducer'
import albumReducer from './reducers/albumReducer'
import musicReducer from './reducers/musicReducer'
import playlistReducer from './reducers/playlistReducer'
import favoriteBodyReducer from './reducers/favoriteBodyReducer'
import graphReducer from './reducers/graphReducer'
import recommendationReducer from './reducers/recommendationReducer'
import loadingReducer from './reducers/loadingReducer'
import alertReducer from './reducers/alertReducer'

const reducers = combineReducers({
    body: bodyReducer,
    artistBody: artistBodyReducer,
    search: searchReducer,
    playlist: playlistReducer,
    albumBody: albumBodyReducer,
    album: albumReducer,
    music: musicReducer,
    favoriteBody: favoriteBodyReducer,
    recommendations: recommendationReducer,
    graph: graphReducer,
    loading: loadingReducer,
    alert: alertReducer
})

const storeConfig = createStore(reducers)

export default storeConfig