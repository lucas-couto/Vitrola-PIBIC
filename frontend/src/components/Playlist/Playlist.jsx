import React from 'react'
import './Playlist.css'

import UserPlaylist from './UserPlaylist/UserPlaylist'
import UserRecommendations from './UserRecommendations/UserRecommendations'
import {connect} from 'react-redux'

const Playlist = props => {
    return (
        <div className="Playlist">
            <div className="Title">
                <div className="playlistTitle">
                    <span>Sua Playlist</span>
                </div>
                <div className="recommendationsTitle">
                    <span>Recomendações</span>
                </div>
            </div>
            <div className="Content">
                <UserPlaylist/>
                <UserRecommendations />
            </div>
        </div>
    )
}

export default connect()(Playlist)