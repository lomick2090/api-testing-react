import React from 'react';

export default function Tile(props) {
    return (
        <div className="tile">
            <img src={props.imgURL} />
            <h3>{props.quote}</h3>
        </div>
    )
}