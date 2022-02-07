import { useState, useEffect } from 'react'
import Square from './components/Square';
import './App.css';

const App = () => {
  const initialRow = [
    { 
      letter: '',
      status: 'blank'
    },
    { 
      letter: '',
      status: 'blank'
    },
    { 
      letter: '',
      status: 'blank'
    },
    { 
      letter: '',
      status: 'blank'
    },
    { 
      letter: '',
      status: 'blank'
    }
  ]
  const [word] = useState('spicy')
  const [typedWord, setTypedWord] = useState('')
  const [tries, setTries] = useState(0)
  const [actuals, setActuals] = useState([])
  const [rowOne, setRowOne] = useState(initialRow)
  const [rowTwo, setRowTwo] = useState(initialRow)
  const [rowThree, setRowThree] = useState(initialRow)
  const [rowFour, setRowFour] = useState(initialRow)
  const [rowFive, setRowFive] = useState(initialRow)
  const [rowSix, setRowSix] = useState(initialRow)
  const [isWon, setIsWon] = useState(false)

  const checkWord = () => {
    const wordArr = word.split('')
    const typedArr = typedWord.split('')
    const correctItems = []
    if(typedArr.length !== wordArr.length) {
      alert('whatttt')
    } else {
      setActuals(curr => [...curr, typedArr])
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
      console.log(correctItems)
      updateWord(correctItems)
      setTries(tries => tries+=1)
      setTypedWord('')
      console.log(actuals)
      // printBoard(correctItems.sort((a,b) => a.typedIndex - b.typedIndex))
    }
  }

  const updateWord = (arr) => {
    const typedArr = typedWord.split('').map((letter, index) => {
      // look to see if there is a typedIndex that matches index
      let filteredArr = arr.filter(item => item.typedIndex === index)
      if (filteredArr.length > 0) {
        return {
          letter: letter,
          status: filteredArr[0].status
        }
      } else {
        return {
          letter: letter,
          status: 'blank'
        }
      }
    })
    showBoard(typedArr)
    if(typedArr.filter(item => item.status === 'correct')) setIsWon(true)
  }

  const handleType = (e) => {
    setTypedWord(e.target.value.toLowerCase())
  }

  const typeWord = () => {
    let newBoard = typedWord.split('').map(letter => {
      return {
        letter: letter,
        status: 'blank'
      }
    })

    if(newBoard.length < 5) {
      newBoard = [...newBoard, ...Array(5-newBoard.length).fill({ letter: '', status: 'blank'})]
    }
    showBoard(newBoard)
  }

  const showBoard = (arr) => {
    switch (tries) {
      case 0: 
        setRowOne(arr)
        break;
      case 1:
        setRowTwo(arr)
        break
      case 2: 
        setRowThree(arr)
        break
      case 3:
        setRowThree(arr)
        break
      case 4:
        setRowFour(arr)
        break
      case 5:
        setRowFive(arr)
        break
      case 6:
        setRowSix(arr)
        break
      default:
        return
    }
  }

  useEffect(()=> {
    typeWord()
    // generateBoard()
    // eslint-disable-next-line
  }, [typedWord])

  // useEffect(()=> {
  //   console.log(rowOne1)
  // }, [rowOne1])

  const generateBoard = (arr) => {
    const newBoard = (
      <div className='row'>
        {
          arr.map(item => {
            return (
              <Square item={item} />
            )
          })
        }
      </div>
      )
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
        {generateBoard(rowOne)}
        {generateBoard(rowTwo)}
        {generateBoard(rowThree)}
        {generateBoard(rowFour)}
        {generateBoard(rowFive)}
        {generateBoard(rowSix)}
      </div>
      <div className='type-container'>
        {typedWord}
        <input 
          value={typedWord} 
          onChange={handleType}/>
        <button onClick={checkWord}>Enter</button>
      </div>
      {
        isWon && (
          <div>
            YOU WON
          </div>
        )
      }
    </div>
  );
}

export default App;
