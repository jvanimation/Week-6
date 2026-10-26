import { useState } from 'react'
import WaterTracker from './Components/WaterTracker'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
   <WaterTracker />
   )
}

export default App
