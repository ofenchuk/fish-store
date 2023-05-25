import React, { useContext } from 'react'
import { FishContext } from '../App'

function AddFishForm() {
  let nameRef = React.createRef()
  let priceRef = React.createRef()
  let statusRef = React.createRef()
  let descRef = React.createRef()
  let imageRef = React.createRef()

  const { fishState, setFish } = useContext(FishContext)
  const createFish = (e) => {
    // fish state
    const fish = {
      name: nameRef.current.value,
      price: parseFloat(priceRef.current.value),
      status: statusRef.current.value,
      desc: descRef.current.value,
      image: imageRef.current.value,
    }
    // add to state
    const fishes = { ...fishState.fishes }
    // create fish unique id
    fishes[`fishes${Date.now()}`] = fish
    console.log(fishState)
    return fishes
  }

  return (
    <form
      className='fish-edit'
      onSubmit={(e) => {
        e.preventDefault()
        setFish({ ...fishState, fishes: createFish() })
        e.currentTarget.reset()
      }}
    >
      <input
        name='name'
        ref={nameRef}
        type='text'
        placeholder='Name'
        required
      />
      <input
        name='price'
        ref={priceRef}
        type='number'
        placeholder='Price'
        required
      />
      <select name='status' ref={statusRef}>
        <option value='available'>Fresh!</option>
        <option value='unavailable'>Sold Out!</option>
      </select>

      <textarea name='desc' ref={descRef} placeholder='Desc'></textarea>
      <input name='image' ref={imageRef} type='text' placeholder='Image' />
      <button type='submit'>+ Add Fish</button>
    </form>
  )
}

export default AddFishForm
