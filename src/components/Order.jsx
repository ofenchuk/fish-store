import React, { useContext } from 'react'
import { FishContext } from '../App'
import { formatPrice } from '../helpers'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

function Order() {
  const { fishState, setFish } = useContext(FishContext)
  const orderIds = Object.keys(fishState.order)
  // remove fish from order
  const removeFromOrder = (index) => {
    const order = { ...fishState.order }
    delete order[index]
    setFish({ ...fishState, order })
  }

  const renderOrder = (key) => {
    const fish = fishState.fishes[key]
    const count = fishState.order[key]
    const isAvailable = fish && fish.status === 'available'
    const time = 500
    const transOp = {
      classNames: 'order',
      key,
      timeout: { enter: time, exit: time },
    }
    if (!fish) return null
    // if fish is not available anymore than show it in order
    if (!isAvailable) {
      return (
        <CSSTransition {...transOp}>
          <li key={key}>
            Sorry {fish ? fish.name : 'fish'} is no longer available
          </li>
        </CSSTransition>
      )
    }
    return (
      <CSSTransition {...transOp}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: time, exit: time }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
          </span>
          <button onClick={() => removeFromOrder(key)}>&times;</button>
        </li>
      </CSSTransition>
    )
  }

  const total = orderIds.reduce((prevTotal, key) => {
    const fish = fishState.fishes[key]
    const count = fishState.order[key]
    const isAvailable = fish && fish.status === 'available'
    return isAvailable ? prevTotal + count * fish.price : prevTotal
  }, 0)

  return (
    <div className="order-wrap">
      <h2>Order</h2>
      <TransitionGroup component="ul" className="order">
        {orderIds.map(renderOrder)}
      </TransitionGroup>
      <div className="total">
        Total:
        <strong>{formatPrice(total)}</strong>
      </div>
    </div>
  )
}

export default Order
