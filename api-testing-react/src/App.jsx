import React from 'react';
import Tile from './components/Tile'
import Header from './components/Header'

export default function App() {
    const [tileData, setTileData] = React.useState([])
    const [tileElements, setTileElements] = React.useState([])

    console.log('rendered')
    
    async function getImgURL() {
        try {
            const response = await fetch('https://source.unsplash.com/random')

            return response.url
        } catch(error) {
            console.error(error)
        }
    }

    async function getQuote() {
        try {
        const response = await fetch('https://api.adviceslip.com/advice')
        const data = await response.json()
        const quote =  data.slip.advice

        return quote

        } catch(error) {
            console.error(error)
        }
    }

    async function createTile() {
        try {
            let imgURL = await getImgURL();
            let quote = await getQuote();
            setTileData(prevTileData => {
                let tileDataCopy = [...prevTileData];
                tileDataCopy.push({
                    imgURL,
                    quote,
                    id: prevTileData.length
                })
                return tileDataCopy
            })
            setTileElements(() => {
                let tileElementsTemp = [];
                tileElementsTemp = tileData.map(tile => {
                    return <Tile imgURL={tile.imgURL} quote={tile.quote} key={tile.id}/>
                })
                return tileElementsTemp
            })
            
        } catch(error) {
            console.error(error)
        }
        
    }
    
    return (
        <div>
            <Header />
            <button onClick={createTile} className="gettile">Get Tile</button>
            <div className="tileholder">{tileElements}</div>
        </div>
    )
}