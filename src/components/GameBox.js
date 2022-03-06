import React from 'react'
import '../styles/App.css';


function GameBox({ data, onPress }) {
  return (
    <div>
    {data?.map((row, iRow) => {
        return (
            <div key={iRow}>
                {row?.map((col, iCol) => {
                    return (
                        <input
                            type="number"
                            key={iCol}
                            value={col === 0 ? "" : String(col)}
                            onChange={(value) => onPress(value, iRow, iCol)}
                        />
                    );
                })}
            </div>
        );
    })}
</div>
  )
}

export default GameBox