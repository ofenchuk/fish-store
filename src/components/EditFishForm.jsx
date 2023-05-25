import React, { useContext } from 'react'
import { FishContext } from '../App'

export default function EditFishForm(props) {
  const { fishState, setFish } = useContext(FishContext)

  const key = props.fish
  const index = props.index

  const handleChange = (e) => {
    // update fish
    const updatedFish = {
      ...props.fish,
      //inteligent name picker
      [e.currentTarget.name]: e.currentTarget.value,
    }
    // get the fishes
    const fishes = { ...fishState.fishes }
    // get specific fish and update it
    fishes[index] = updatedFish
    //put updated fish into state
    setFish({ ...fishState, fishes })
  }

  const deleteFish = (index) => {
    const fishes = { ...fishState.fishes }
    fishes[index] = null
    delete fishes[index]
    setFish({...fishState, fishes})
    
  }

  return (
    <form className="fish-edit" key={key}>
      <input
        name="name"
        value={key.name}
        onChange={handleChange}
        type="text"
        placeholder="Name"
      />
      <input
        name="price"
        value={key.price}
        onChange={handleChange}
        type="number"
        placeholder="Price"
      />
      <select name="status" onChange={handleChange} value={key.status}>
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>

      <textarea
        name="desc"
        onChange={handleChange}
        value={key.desc}
        placeholder="Desc"
      ></textarea>
      <input
        name="image"
        onChange={handleChange}
        value={key.image}
        type="text"
        placeholder="Image"
      />
      <button
        onClick={(e) => {
          e.preventDefault()
          deleteFish(index)
        }}
      >
        Remove Fish
      </button>
    </form>
  )
}
