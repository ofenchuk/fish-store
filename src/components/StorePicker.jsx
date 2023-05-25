import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getFunName } from '../helpers'

function StorePicker() {
  const myInput = React.createRef()
  const navigate = useNavigate()

  const goToStore = (e) => {
    e.preventDefault()
    // get text from input
    const storeId = myInput.current.value
    console.log(storeId)
    // redirect
    navigate(`/store/${storeId}`)
  }

  return (
    <form action="" className="store-selector" onSubmit={goToStore}>
      <h2>Please Enter A Store</h2>
      <input
        type="text"
        required
        placeholder="Store Name"
        defaultValue={getFunName()}
        ref={myInput}
      />
      <button type="submit">Visit Store ➡️</button>
    </form>
  )
}

export default StorePicker

