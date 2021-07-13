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
const warning = () => {
  setTimeout(() => {
    if (window.confirm(`Olá Usuario! Você poderia preencher um formulario?`)){
      window.open('https://forms.gle/iak5oEVswoWowRZw5', '_blank');
    }
  }, 120000)
}
export default () => {
  warning()
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
