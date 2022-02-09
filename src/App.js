import { useState, useEffect } from 'react'
import { useWordApi } from './hooks/useWordApi'
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
  const [word] = useState('alive')
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
  const [cantPlay, setCantPlay] = useState(false)
  const { checkIsWord } = useWordApi()


  const checkWord = async () => {
    const wordArr = word.split('')
    const typedArr = typedWord.split('')
    const correctItems = []
    if(typedArr.length !== wordArr.length) {
      // Create more of a message versus a full alert
      alert('Not enough letters')
    } else {
      // is the typed word a word?
      try {
        const isActualWord = await checkIsWord(typedWord)
        if (isActualWord) {
          setActuals(curr => [...curr, typedArr])
          for (let i=0 ; i < wordArr.length; i++){
            for(let j=0; j < typedArr.length; j++){
              if(wordArr[i] === typedArr[j] && i === j){
                correctItems.push({
                  rightIndex: i,
                  typedIndex: j,
                  letter: typedArr[j],
                  status: 'correct'
                })
              } else if (wordArr[i] === typedArr[j]) {
                correctItems.push({
                  rightIndex: i,
                  typedIndex: j,
                  letter: typedArr[j],
                  status: 'almost'
                })
              }
            }
          }
          updateWord(correctItems)
          setTries(tries => tries+=1)
          setTypedWord('')
          console.log(actuals)
        } else {
          alert('Not a word')
          setTypedWord('')
        }
      }
      catch(err) {
        console.error(err)
      }
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
    if(typedArr.filter(item => item.status === 'correct').length === 5) setIsWon(true)
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

    if(newBoard.length < 6) {
      newBoard = [...newBoard, ...Array(5-newBoard.length).fill({ letter: '', status: 'blank'})]
      showBoard(newBoard)
    }
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
        setRowFour(arr)
        break
      case 4:
        setRowFive(arr)
        break
      case 5:
        setRowSix(arr)
        break
      default:
        return
    }
  }

  useEffect(()=> {
    typeWord()
    // eslint-disable-next-line
  }, [typedWord])

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
    return newBoard
  }

  const closeModal = () => {
    setIsWon(false)
    setCantPlay(true)
  }
  
  return (
    <div className="App">
      <h1>Fake Wordle 2 (2/9/2022)</h1>
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
          maxLength='5'
          value={typedWord} 
          onChange={handleType}
          disabled={cantPlay}
          />
        <button 
          onClick={checkWord}
          disabled={cantPlay}
          >
            Enter
        </button>
      </div>
      {
        isWon && (
          <div className='win-modal'>
            <div className='win-container'>
              <h2>Fordle 2</h2>
              <h3>You did it in {tries} / 6</h3>
              {/* <h3>Show Emoji's</h3> */}
              <button onClick={() => alert('Next Feature: will copy emojis to clipboard')}>Share</button>
              <button onClick={closeModal}>X</button>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default App;
