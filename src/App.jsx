import { useState } from 'react'
import './App.css'
import Password from './components/Password'
import Home from './components/Home'

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <>
      {!isUnlocked ? (
        <Password onUnlock={() => setIsUnlocked(true)} />
      ) : (
        <Home />
      )}
    </>
  )
}

export default App