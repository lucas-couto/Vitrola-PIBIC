import React from 'react'
import { connect } from 'react-redux'
import Artist from '../Artist/Artist'
import Graph from '../Graph/Graph'
import Favorites from '../Favorites/Favorites'
import Home from '../Home/Home'


const Body = props => {
    if (props.body == 'BODY_ARTIST')
        return <Artist />
    else if (props.body == 'BODY_GRAPH')
        return <Graph />
    else if (props.body == 'BODY_FAVORITES')
        return <Favorites />
    else 
        return <Home/>
}


const mapStateToProps = (state) => {
    return { body: state.body }
}

export default connect(mapStateToProps)(Body)