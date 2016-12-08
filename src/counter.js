import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'

// REDUCER
const counter = (state = 0, action) => {
	switch(action.type) {
		case 'INCREMENT':
			return state + 1
		case 'DECREMENT':
			return state - 1
		default:
			return state
	}
}

// STORE + MIDDLEWARE
const logger = createLogger()
const store = createStore(
	counter,
	applyMiddleware(logger)
)

// SUBSCRIBE
const showCounter = () => 	{ 
	document.querySelector('#root').innerText = store.getState() 
}
store.subscribe(showCounter)
showCounter()

// DISPACTH 'INCREMENT' ACTIONS on CLICK 
document.addEventListener( 'click', () => {
	store.dispatch({ type: 'INCREMENT' })
})

// DISPATCH
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'DECREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'DECREMENT' })
store.dispatch({ type: 'DECREMENT' })
store.dispatch({ type: 'INCREMENT' })
