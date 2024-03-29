import React, { useState, useEffect } from 'react';
import Graph from 'vis-react';
import './Graph.css'

import { connect } from 'react-redux'
import { artist } from '../../store/actions/artistAction'
import { Ring } from 'react-spinners-css';
let options = {
    autoResize: true,
    nodes: {
        x: 0,
        y: 0,
        color: {
            border: '#000',
            background: '#3E3E3E',
        },
        font: {
            color: '#FFF',
            size: 14, // px
            face: 'arial',
            background: 'none',
            align: 'center',
            bold: {
                color: '#343434',
                size: 16, // px
                face: 'arial',
                vadjust: 0,
                mod: 'bold'
            }
        }
    },
    edges: {
        length: 170,
        width: 1,
        shadow: {
            enabled: true,
            color: 'rgba(0,0,0,0.5)',
            size: 10,
            x: 5,
            y: 5
        },
        smooth: {
            enabled: true,
            type: "dynamic",
            roundness: 0.5
        },
        font: {
            color: '#FF6161',
            size: 18, // px
            bold: {
                color: '#FF6161',
                size: 18, // px
                face: 'arial',
                vadjust: 0,
                mod: 'bold'
            },
        }
    },
    physics: {
        stabilization: false
    }
}

let style = {
    height: "98%",
    margin: "5px",
    backgroundColor: "#f4f4f4"
}

let indexNode
let featuredArtist
let graph
let events
let allNodes
let allEdges
let similarArtistName
let similarArtistMbid
let id
const Graph1 = props => {
    const { artistName, artistMbid, similarArtists, loading } = props
    const [network, setNetwork] = useState(null)
    const [Nodes, setNodes] = useState(null)
    const [Edges, setEdges] = useState(null)
    const [show, setShow] = useState(false)

    useEffect(() => {
        wellCome()
    }, [similarArtists])

    graph = {
        nodes: Nodes,
        edges: Edges
    };
    if (network) {
        network.once("beforeDrawing", function () {
            network.focus(1, {
                scale: 5,
            });
        });
        network.once("afterDrawing", function () {
            network.fit({
                animation: {
                    duration: 3000,
                    easingFunction: 'linear',
                },
            });
        });
        setNetwork(null)
    }
    events = {
        doubleClick: function (event) {
            indexNode = event.nodes[0]
            featuredArtist = graph.nodes[indexNode - 1].artistMbid
            props.loadingApp()
            props.artistAction(featuredArtist)
            searchMainSimilarArtist(featuredArtist)
        }
    };
    function wellCome() {
        if (similarArtists) {
            searchMainSimilarArtist()
        }
        return (
            <div className="wellCome">
                <h1>Bem vindo!</h1>
                <p>Para começar a utilizar o aplicativo, por favor digite o nome de um Artista.</p><br />
            </div>
        )
    }
    function showGraph() {
        return (
            <Graph
                graph={graph}
                options={options}
                style={style}
                events={events}
                getNetwork={e => { setNetwork(e) }}
            />
        )
    }

    // Logica para mostrar, o relacionamento de artistas
    function searchMainSimilarArtist() {
        allNodes = []
        allEdges = []
        allNodes.push({ artistMbid: artistMbid, id: 1, label: artistName, y: 0, font: { size: 24, color: 'Black', face: 'arial' }, color: '#FF6161', border: "#000000" },)
        similarArtists.forEach((artist, index) => {
            id = index + 2
            similarArtistName = artist.name
            similarArtistMbid = artist.mbid
            allNodes.push({ artistMbid: similarArtistMbid, id: id, label: similarArtistName },)
            allEdges.push({ from: 1, to: id, arrows: 'from' },)
        })
        setNodes(allNodes)
        setEdges(allEdges)
        setShow(true)
    }
    function initial() {
        if (loading)
            return (<div className="loading">
                <Ring color="#FF6161" size={45} />
            </div>)
        else if(show)
            return showGraph()
        else
            return wellCome()
    }
    return (
        <div className="Graph">
            {initial()}
        </div>
    )
}
const mapStateToProps = state => {
    return {
        artistName: state.artist.artistName,
        artistMbid: state.artist.artistMbid,
        similarArtists: state.artist.similarArtists,
        loading: state.loading.loadingApp
    }
}

const mapDispatchToProp = dispatch => {
    return {
        async artistAction(artistMbid) {
            dispatch(await artist(artistMbid))
        },
        loadingApp() {
            dispatch({ type: 'LOADING_APP', loadingApp: true })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProp)(Graph1)