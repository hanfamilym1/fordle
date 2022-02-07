const Square = ({ letter, type }) => {
  return (
    <div className={`square ` + type } >{letter}</div>
  )
}

export default Square