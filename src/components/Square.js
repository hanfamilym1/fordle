const Square = ({ item }) => {
  return (
    <div className={`square ${item.status}`} >{item.letter.toUpperCase()}</div>
  )
}

export default Square