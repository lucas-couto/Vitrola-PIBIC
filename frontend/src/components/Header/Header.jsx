import React, { useState } from 'react'
import './Header.css'

import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { grey } from '@material-ui/core/colors';
import { Ring } from 'react-spinners-css';
import { connect } from 'react-redux'
import { search } from '../../store/actions/searchAction'
import { artist } from '../../store/actions/artistAction'
import { album } from '../../store/actions/albumAction'
import { music } from '../../store/actions/musicAction'
import API from '../../store/api'
let informations
let type
let mbid
let playlist = localStorage.getItem('playlistMusics')
if (!playlist)
    localStorage.setItem('playlistMusics', JSON.stringify([]))
const Header = props => {
    const cellPhone = useMediaQuery('(max-width:575.98px)');
    informations = []
    const { artist, album, music } = props
    const [showResults, setShowResults] = useState(false)
    const [inputValue, setInputValue] = useState(null)
    const [loadingLoop, setLoadingLoop] = useState('none')
    if (artist)
        informations.push(artist)
    if (album)
        informations.push(album)
    if (music)
        informations.push(music)
    const setValue = async (event) => {
        setInputValue(event.target.value)
    }
    const handleKeyDown = async event => {
        if (event.key === 'Enter') {
            if(inputValue){
                setLoadingLoop('block')
                await props.searchInformation(event.target.value)
                setLoadingLoop('none')
                setShowResults(true)
            }else{
                alert('Os dados de pesquisa estão vazios!')
            }
        }
    }
    const handleSearch = async () => {
        if(inputValue){
            setLoadingLoop('block')
            await props.searchInformation(inputValue)
            setLoadingLoop('none')
            setShowResults(true)
        }else{
            alert('Os dados de pesquisa estão vazios!')
        }
    }
    const handleInformation = (e) => {
        mbid = e.currentTarget.getAttribute("data-mbid")
        type = e.currentTarget.getAttribute("data-type")
        setShowResults(false)
        if (type == 'artist')
            props.artistAction(mbid)
        if (type == 'album')
            props.albumAction(mbid)
        if (type == 'music')
            props.musicAction(mbid)
    }

    const GetResults = informations.map(information => {
        if (information.type == 'music')
            type = 'Musica'
        else if (information.type == 'album')
            type = 'Album'
        else if (information.type == 'artist')
            type = 'Artista'
        return (
            <li key={information.mbid} data-mbid={information.mbid} data-type={information.type} onClick={handleInformation}>
                <a href="#">
                    <img src={`${API}/image?imageDirectory=${information.image}`} 
                    onError={e => {e.target.src = `${API}/image?imageDirectory=/artist/principalArtistIcon.png`}}/>
                    <div>
                        <strong>{information.name}</strong>-<i>{type}</i>
                    </div>
                </a>
            </li>
        )
    })
    return (
        <div className="Header">
            <label className="SearchLabel">Pesquisar: </label>
            <input className="SearchInput" type="text" list="data" placeholder=" Artista, Album, Musica" onKeyDown={handleKeyDown} onChange={setValue} />
            <div className="Icons">
                <IconButton size="small" onClick={handleSearch}>
                    <SearchIcon style={{ fontSize: 25, color: grey[50] }} />
                </IconButton>
                {cellPhone ? null : (<Ring
                    color="#fff"
                    style={{ display: loadingLoop }}
                    size={30}
                />)}
            </div>
            {showResults ? (
                <ul>
                    {GetResults ? GetResults : alert('Pesquisa não encontrada!')}
                </ul>
            ) : null}
        </div>
    )
}
const mapStateToProps = state => {
    return {
        artist: state.search.artist,
        album: state.search.album,
        music: state.search.music
    }
}

const mapDispatchToProps = dispatch => {
    return {
        async searchInformation(name) {
            const action = await search(name)
            dispatch(action)
        },
        async artistAction(mbid) {
            const action = await artist(mbid)
            dispatch(action)
        },
        async albumAction(mbid) {
            const action = await album(mbid)
            dispatch(action)
        },
        async musicAction(mbid) {
            const action = await music(mbid)
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)