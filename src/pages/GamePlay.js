import React, { useState, useEffect } from "react";
import '../styles/App.css';
import { GameBox, DifficultyContainer, GameStatus, Button, } from '../components';
import { encodeParams, groupArrayOfObjects } from '../utils';

const GamePlay = () => {
    const [board, setBoard] = useState([]);
    const [difficultyStatus, setDifficultyStatus] = useState(0);
    const [validity, setValidity] = useState(null);
    const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    const difficultyLevels = ['easy', 'medium', 'hard']

    useEffect(() => {
        getDifficulty('easy')
    }, []);

    function getDifficulty(difficultyLevel) {
        fetch(`https://vast-chamber-17969.herokuapp.com/generate?difficulty=${difficultyLevel}`)
            .then((resp) => resp.json())
            .then((data) => {
                const dataObject = data?.puzzle
                var newArray = []
                for (const key in dataObject) {
                    if (dataObject.hasOwnProperty(key)) {
                        newArray.push({ keyMatch: key[0], key: key, value: dataObject[key], index: Number(key[1]) - 1 });
                    }
                }
                var groupedPeople = groupArrayOfObjects(newArray, "keyMatch");
                let sortedArray = []
                for (let i = 0; i < cols.length; i++) {
                    sortedArray.push(groupedPeople[`${cols[i]}`])
                }
                sortedArray = sortedArray?.map((v, i) => {
                    var newVal = [0, 0, 0, 0, 0, 0, 0, 0, 0]
                    for (let index = 0; index < 9; index++) {
                        if (v[index] && v[index]) {
                            newVal[v[index]?.index] = Number(v[index]?.value)
                        }
                    }
                    return newVal
                })
                setBoard(sortedArray)

            });
    }

    const handleUpdate = (value, iRow, iCol) => {
        if (Number(value.target.value) && Number(value.target.value) < 10) {
            const newBoard = [...board];
            newBoard[iRow][iCol] = Number(value.target.value);
            setBoard(newBoard);
        } else {
            const newBoard = [...board];
            newBoard[iRow][iCol] = 0;
            setBoard(newBoard);
        }
    };

    const clearTable = () => {
        var clear = [...board]
        clear = board.map(value => {
            value = value.map(v => {
                v = 0
                return v;
            })
            return value;
        })
        setBoard(clear)
    }

    const solveBoard = () => {
        const data = { board }

        fetch('https://sugoku.herokuapp.com/solve', {
            method: 'POST',
            body: encodeParams(data),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(response => response.json())
            .then(response => setBoard(response.solution))
            .catch(console.warn)
    }

    const validateBoard = () => {
        const data = { board }

        fetch('https://sugoku.herokuapp.com/validate', {
            method: 'POST',
            body: encodeParams(data),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(response => response.json())
            .then(response => setValidity(response.status))
            .catch(console.warn)
    }


    return (<>
        <div className="container">

            <GameBox data={board} onPress={handleUpdate} />

            <GameStatus setDifficultyStatus={setDifficultyStatus} validity={validity} difficultyLevels={difficultyLevels} difficultyStatus={difficultyStatus} />

        </div>
        <div className="buttonContainer">

            <DifficultyContainer difficultyLevels={difficultyLevels} getDifficulty={getDifficulty} setDifficultyStatus={setDifficultyStatus} setValidity={setValidity} />

            <Button className={"button  button3"} title={'Clear'} onClick={() => (clearTable(), setValidity(null))} />
            <Button className={"button  button2"} title={'Validate'} onClick={() => validateBoard()} />
        </div>

        <div className="buttonContainer">
            <Button className={"button  button1"} title={'Solve'} onClick={() => (solveBoard(), setValidity(null))} />
        </div>
    </>
    );
};


export default GamePlay;