import { useState, useEffect, useCallback } from 'react'
import Square from './components/Square';
import './App.css';

const App = () => {
  const [word] = useState('welift')
  const [typedWord, setTypedWord] = useState('')
  const [tries, setTries] = useState(0)
  const [board, setBoard] = useState([
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
  ])
  const [shownBoard, setShownBoard] = useState([])
  const checkWord = () => {
    const wordArr = word.split('')
    const typedArr = typedWord.split('')
    const correctItems = []
    if(typedArr.length !== wordArr.length) {
      alert('whatttt')
    } else {
      for (let i=0 ; i < wordArr.length; i++){
        for(let j=0; j < typedArr.length; j++){
          console.log(wordArr[i], typedArr[j])
          if(wordArr[i] === typedArr[j] && i === j){
            console.log('same letter and same index', i, j)
            correctItems.push({
              rightIndex: i,
              typedIndex: j,
              letter: typedArr[j],
              status: 'correct'
            })
          } else if (wordArr[i] === typedArr[j]) {
            console.log('same letter, but not same index', i, j)
            correctItems.push({
              rightIndex: i,
              typedIndex: j,
              letter: typedArr[j],
              status: 'almost'
            })
          }
        }
      }
      printBoard(correctItems.sort((a,b) => a.typedIndex - b.typedIndex))
    }
  }

  const printBoard = () => {
    let newBoard = typedWord.split('')
    if(newBoard.length < 6) {
      newBoard = [...newBoard, ...Array(6-newBoard.length).fill(1)]
    }
    setBoard(currBoard => {
      currBoard[tries] = newBoard
      return currBoard
    })
  }

  useEffect(()=> {
    printBoard()
    generateBoard()
  }, [typedWord])

  const generateBoard = () => {
    const newBoard = board.map(row => {
      const columns = row.map(col => {
        return (
          <Square letter={col} />
        )
      })
      return <div className='row'>{columns}</div>
    })
    // KEEP WHEN MAKING A RANDOM BOARD
    // const newBoard = Array(tries).fill(1).map(row => {
    //   const columns = Array(length).fill(1).map(col => <Square letter={col} />)
    //   return <div className='row'>{columns}</div>
    // })
    return newBoard
  }
  
  return (
    <div className="App">
      <h1>Fake Wordle</h1>
      <div className='board'>
        {generateBoard()}
      </div>
      <div className='type-container'>
        {typedWord}
        <input 
          value={typedWord} 
          onChange={(e) => setTypedWord(e.target.value)}/>
        <button onClick={checkWord}>Enter</button>
      </div>
    </div>
  );
}

export default App;
