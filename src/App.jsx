import { useState } from 'react'
import './App.css'
import Password from './components/Password'
import Home from './components/Home'

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
      {!isUnlocked ? (
        <Password onUnlock={() => setIsUnlocked(true)} />
      ) : (
        <Home />
      )}
    </div>
  )
}

export default App