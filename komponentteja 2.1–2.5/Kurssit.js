import React from 'react'
import Kurssi from './Kurssi'

const Kurssit = (props) => {
    const kurssi = () => props.kurssit.map(kurssi =>
        <div key={kurssi.id}>
            <Kurssi kurssi={kurssi} />
        </div>
    )

    return (
        <div>
            <h1>Opetusohjelma</h1>
            {kurssi()}
        </div> 
    )
}

export default Kurssit