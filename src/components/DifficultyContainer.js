import React from 'react'
import {capitalize} from '../utils'

function DifficultyContainer({difficultyLevels, getDifficulty, setDifficultyStatus, setValidity}) {

  return (
    <div>{difficultyLevels?.map((v, i) => {
        return <button className="button button4" onClick={() => (getDifficulty(v), setDifficultyStatus(i), setValidity(null))}>
            {capitalize(v)}
        </button>
    })}</div>
  )
}

export default DifficultyContainer