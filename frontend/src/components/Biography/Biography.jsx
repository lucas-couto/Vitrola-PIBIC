import React, { useState, useEffect } from 'react'
import './Biography.css'
import Albums from './Albums/Albums'
import { connect } from 'react-redux'
import API from '../../store/api'

const Biography = props => {
    const { artistMbid, artistName, artistBiography, artistImage } = props
    const [displayImage, setDisplayImage] = useState('flex')
    const [displayBiography, setDisplayBiography] = useState('space-between')
    const [displayTextBiography, setDisplayTextBiography] = useState('inline')
    const [displayButtonBiography, setDisplayButtonBiography] = useState('none')
    const [displayButtonAlbum, setDisplayButtonAlbum] = useState('block')
    const [displayAlbums, setDisplayAlbums] = useState(false)
    useEffect(() =>{
        handleClickBtnBiography()
    }, [artistMbid])
    function handleClickBtnAlbums() {
        if (displayImage === 'flex' && displayTextBiography === 'inline') {
            setDisplayButtonAlbum('none')
            setDisplayButtonBiography('block')
            setDisplayBiography('normal')
            setDisplayImage('none')
            setDisplayTextBiography('none')
            setDisplayAlbums(true)
        }
    }
    function handleClickBtnBiography() {
        if (displayImage === 'none' && displayTextBiography === 'none') {
            setDisplayAlbums(false)
            setDisplayButtonAlbum('block')
            setDisplayButtonBiography('none')
            setDisplayBiography('space-between')
            setDisplayImage('flex')
            setDisplayTextBiography('inline')
        }
    }

    return (
        <div className="Biography" style={{ justifyContent: displayBiography }}>
            <div className="titleBiography">
                <label className="artistName">{artistName ? artistName : 'Nome Artista/Banda'}</label>
            </div>
            <div className="imageBiography" style={{ display: displayImage }}>
                {artistImage ?
                <img 
                src={`${API}/image?imageDirectory=${artistImage}`}
                onError={e => {e.target.src = `${API}/image?imageDirectory=/artist/principalArtistIcon.png`}} /> 
            : <p><strong>Imagem do Artista</strong></p>}
            </div>
            <div className="contentBiography" style={{ display: displayTextBiography }}>
                {artistBiography ? (
                    <p className="textBiography">
                        {artistBiography}
                    </p>
                )
                    : (
                        <p className="defaultBiography">
                            Biografia do Artista
                        </p>
                    )}
            </div>
            <div className="buttonsBiography">
                <button className="buttonBiography" style={{ display: displayButtonBiography }} onClick={handleClickBtnBiography}><span>Biografia do Artista</span></button>
                <button className="albumsBiography" onClick={handleClickBtnAlbums} style={{ display: displayButtonAlbum }} disabled={artistMbid ? false : true}><span>Albums</span></button>
            </div>
            {displayAlbums ? (
                <Albums />) : null}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        artistMbid: state.artist.artistMbid,
        artistName: state.artist.artistName,
        artistBiography: state.artist.artistBiography,
        artistImage: state.artist.artistImage
    }
}

export default connect(mapStateToProps)(Biography)