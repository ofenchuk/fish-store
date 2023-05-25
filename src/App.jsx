import './App.css'
import './css/style.css'
import Header from './components/Header'
import Inventory from './components/Inventory'
import Order from './components/Order'
import { createContext, useState } from 'react'
import Fish from './components/Fish'

export const FishContext = createContext()
export const OrderContext = createContext()

function App() {
  const [fishState, setFish] = useState({ fishes: {}, order: {} })
  // add fish to order if there is none or increment if there is one
  const addToOrder = (key) => {
    const order = { ...fishState.order }
    order[key] = order[key] + 1 || 1
    setFish({ ...fishState, order })
  }

  return (
    <FishContext.Provider value={{ fishState, setFish }}>
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(fishState.fishes).map((key) => (
              <Fish
                key={key}
                index={key}
                details={fishState.fishes[key]}
                addToOrder={addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order />
        <Inventory />
      </div>
    </FishContext.Provider>
  )
}
export default App
