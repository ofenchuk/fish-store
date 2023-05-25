import { useContext, useEffect, useRef } from 'react'
import { base } from '../base'
import { useParams } from 'react-router-dom'
import { child, get, getDatabase, ref, set } from 'firebase/database'
import fishes from '../sampleFishes'
import { FishContext } from '../App'

function LifeCycle() {
  const { fishState, setFish } = useContext(FishContext)

  const url = useParams().storeId
  const dbRef = ref(getDatabase())
  const count = useRef(false)

  // load fishes from firebase database and from localStorage on page load
  useEffect(() => {
    const localStorageRef = localStorage.getItem(url)
    const localJson = JSON.parse(localStorageRef)
    console.log(localJson)
    // if localStorage has data, set it to state
    get(child(dbRef, `${url}/fishes`)).then((snapshot) => {
      const state = snapshot.val()
      if (state) {
        setFish({ fishes: state, order: localJson })
      }
    })
  }, [])

  // save fishes to firebase database on fishState change
  useEffect(() => {
    const newPostRef = child(ref(base), url)
    // get fishes from firebase database
    get(child(dbRef, `${url}/fishes`)).then((snapshot) => {
      const state = snapshot.val()
      // if database state and local state are different, update cloud state
      if (state !== fishes.state) {
        set(newPostRef, {
          fishes: fishState.fishes,
        })
      }
    })
  }, [fishState.fishes])

  // save fishes to localStorage on order change
  useEffect(() => {
    // if count is false, set count to true and save order to localStorage
    if (count.current) {
      localStorage.setItem(url, JSON.stringify(fishState.order))
    } else {
      count.current = true
    }
  }, [fishState.order])
}

export default LifeCycle
