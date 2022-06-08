import { useEffect } from 'react'
import axios from 'axios'

const App = () => {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/products/') // * <-- replace with your endpoint
      console.log(data)
    }
    getData()
  })

  return <h1>Hello World</h1>
}

export default App
