import React from 'react';
import './App.css';
import Header from './components/Header/Header'
import Graph from './components/Graph/Graph'
import Playlist from './components/Playlist/Playlist'
import Biography from './components/Biography/Biography'
import Footer from './components/Footer/Footer'

let playlist = localStorage.getItem('playlistMusics')
if (!playlist)
    localStorage.setItem('playlistMusics', JSON.stringify([]))
export default () => {
  return (
    <div className="App">
      <Header />
      <Graph />
      <Playlist />
      <Biography />
      <Footer />
    </div>
  )
}
