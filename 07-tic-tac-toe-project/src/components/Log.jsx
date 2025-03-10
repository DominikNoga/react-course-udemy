import React from 'react'

export default function Log({turns = []}) {
    return (
        <ol id='log'>
            {
                turns.map((turn, index) => (
                    <li className={!index ? 'highlighted' : null} key={index}>
                        <p>
                            {turn.player} selected ({turn.square.row}, {turn.square.col})
                        </p>
                    </li>
                ))
            }
        </ol>
    )
}
