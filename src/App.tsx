import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [canva, setCanva] = useState<string | undefined>()

  useEffect(() => {
    setCanva('');
  }, [])

  return (
    <div className="App">
      <img src={canva}></img>
    </div>
  )
}

export default App