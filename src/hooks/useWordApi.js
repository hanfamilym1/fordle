import axios from 'axios'

export const useWordApi = () => {

  const checkIsWord = async (word) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_WORDSAPI_URL}${word}`, {
        headers: {
          'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
        }
      })
      console.log(res)
      if(res.status === 200) {
        return true
      } 
    } catch (e) {
      console.error(e)
      return false
    }
  }


  // result :
  return { checkIsWord }
}
