import React from 'react'
import './Card.css'
const Card = ({ Message, Name, Email }) => {
    return (
        <>
            <div className="container">
                <div className="card_content">
                    <div className="name">
                        <h3>{Name}</h3>
                        <p>{Email}</p>
                    </div>
                    <div className="msg">
                        <p>{Message}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card