import React from 'react'

const Kurssi = (props) => {
    const osat = () => props.kurssi.osat.map(osa =>
        <p key={osa.id}>{osa.nimi} {osa.tehtavia}</p>
    )
    const tehtavat = props.kurssi.osat.map(osa => osa.tehtavia)
    const yhteenlasku = (lisays, total) => lisays + total;
    const yhteensa = () => tehtavat.reduce(yhteenlasku)
    
    return (
        <div>
            <h1>{props.kurssi.nimi}</h1>
            {osat()}
            <p>Yhteensä {yhteensa()} tehtävää.</p>
        </div>
    )
}

export default Kurssi