import React from 'react';
import { capitalize } from '../utils'

function GameStatus({ setDifficultyStatus, validity, difficultyLevels, difficultyStatus }) {
    return (
        <div>
            <div className='difficultyStatus'>{setDifficultyStatus !== null && `Difficulty Level: ${capitalize(difficultyLevels[difficultyStatus])}`}</div>
            <div className='validity difficultyStatus'>{validity && `\nValidity : ${capitalize(validity)}`}</div>
        </div>
    )
}

export default GameStatus