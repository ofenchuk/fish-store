import React, { useContext } from 'react'
import { FishContext } from '../App'
import AddFishForm from './AddFishForm'
import sampleFishes from '../sampleFishes'
import EditFishForm from './EditFishForm'
import { useParams } from 'react-router-dom'
import { child, get, getDatabase, ref, set } from 'firebase/database'
import { useEffect, useRef } from 'react'
import fishes from '../sampleFishes'
import { base } from '../base'
import Login from '../Login'
import { getAuth, signOut } from 'firebase/auth'

function Inventory() {
  const { fishState, setFish } = useContext(FishContext)

  const url = useParams().storeId
  const dbRef = ref(getDatabase())
  const count = useRef(false)

  // load inventory and order on load
  useEffect(() => {
    const localStorageRef = localStorage.getItem(url)
    const localJson = JSON.parse(localStorageRef)
    console.log(localJson)
    get(child(dbRef, `${url}`)).then((snapshot) => {
      const state = snapshot.val().fishes
      const owner = snapshot.val().owner
      if (state) {
        setFish({ fishes: state, order: localJson, owner })
      }
    })
    
  }, [])

  // add fish to base
  useEffect(() => {
    const newPostRef = child(ref(base), url)

    get(child(dbRef, `${url}/fishes`)).then((snapshot) => {
      const state = snapshot.val()
      if (state !== fishes.state) {
        set(newPostRef, {
          fishes: fishState.fishes,
          owner: fishState.owner,
        })
      }
    })
  }, [fishState.fishes])

  // add order
  useEffect(() => {
    if (count.current) {
      localStorage.setItem(url, JSON.stringify(fishState.order))
    } else {
      count.current = true
    }
  }, [fishState.order])

  const loadSampleFishes = () => {
    console.log(fishState)
    setFish({ ...fishState, fishes: sampleFishes })
  }
  
  const logout = async () => {
    console.log('Logging Out')
    await signOut(getAuth())
    setFish({...fishState, uid: null})
  }

  const logoutBtn = <button onClick={logout}>Log Out!</button>

  // 1. check if user logged in
  if (!fishState.uid) {
    console.log(fishState)
    return <Login></Login>
  }
  // 2. check if user is not the owner of the store
  if (fishState.uid !== fishState.owner) {
    return (
      <div>
        <p>Sorry you're not the owner</p>
        {logoutBtn}
      </div>
    )
  }

  // if user is the owner then render the inventory
  return (
    <div className="inventory">
      <h2>Inventory</h2>
      {logoutBtn}
      <AddFishForm />
      {Object.keys(fishState.fishes).map((key) => (
        <EditFishForm fish={fishState.fishes[key]} index={key} key={key} />
      ))}
      <button onClick={loadSampleFishes}>Load Samples</button>
    </div>
  )
}

export default Inventory
