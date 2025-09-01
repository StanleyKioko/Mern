import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {

  const[data, setData] =useState()

  useEffect(() => {
    async function grabData(){
      const response = await axios.get('http://localhost:3000/posts');
      if(response.status === 200){
        setData(response.data)
        console.log(response.data)
      }
    }

    grabData()


  }, [])

  return (
    <>
      {JSON.stringify(data)}
    </>
  )
}

export default App
