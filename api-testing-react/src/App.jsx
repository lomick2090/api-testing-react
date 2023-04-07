import React from 'react';
import Tile from './components/Tile'

export default function App() {
    const [tileData, setTileData] = React.useState([])
    let tileElements = []
    
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
        let imgURL = await getImgURL();
        let quote = await getQuote();
        setTileData(prevTileData => {
            let tileDataCopy = [...prevTileData];
            tileDataCopy[prevTileData.length] = {
                imgURL,
                quote,
                id: prevTileData.length
            }
            return tileDataCopy
        })

        for (let i =0; i< tileData.length; i++) {
            tileElements.push(<Tile imgURL={imgURL} quote={quote} />)
        }
        console.log(tileElements)
    }


    return (
        <div>
            <button onClick={createTile}>Get Tile</button>
            {tileElements}
        </div>
    )
}