import React, { useContext } from 'react'
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth'

// import firebase from 'firebase/app'
import firebaseApp from './base'
import { useParams } from 'react-router-dom'
import { child, get, getDatabase, ref, set } from 'firebase/database'
import { FishContext } from './App'
import { useEffect } from 'react'

function Login() {
  const { fishState, setFish } = useContext(FishContext)

  const dbRef = ref(getDatabase())
  const url = useParams().storeId

  const authHandler = async (authData) => {
    // 1. Look up the current store in the firebase database
    get(child(dbRef, `${url}/fishes`)).then((snapshot) => {
      // 2. Claim it if there's no owner
      if (!snapshot.exists()) {
        set(ref(getDatabase(), `${url}`), {
          owner: authData.user.uid,
        })
      }
    })
    // 3. Set the state of the inventory component to reflect the current user
    setFish({
      ...fishState,
      uid: authData.user.uid,
      owner: fishState.owner || authData.user.uid,
    })
  }
  // authentication function
  const authenticate = (provider) => {
    const auth = getAuth(firebaseApp)
    signInWithPopup(auth, provider).then(authHandler)
  }

  // sign user in after page reload if user was logged in previously
  useEffect(() => { 
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        authHandler({ user })
      }
    })
  }, [])

  return (
    <nav className="login">
      <h2>Inventory Login</h2>
      <p>Sign in to manage your store's Inventory</p>
      <b
        utton
        className="github"
        onClick={() => authenticate(new GithubAuthProvider())}
      >
        Log In With Github
      </b>
      <button
        className="twitter"
        onClick={() => authenticate(new TwitterAuthProvider())}
      >
        Log In With Twitter
      </button>
      <button
        className="google"
        onClick={() => authenticate(new GoogleAuthProvider())}
      >
        Log In With Google
      </button>
    </nav>
  )
}

export default Login
