import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'

// REDUCER
const counter = (state = 0, action) => {
	switch(action.type) {
		case 'INC':
			return state + 1
		case 'DEC':
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


// COMPONENT
const App = ({ value, onINC, onDEC }) => (
	<div>
		<h1>{value}</h1>
		<button onClick={onINC}> + </button>
		<button onClick={onDEC}> - </button>
	</div>
)

// RENDER + DISPATCH
const render = () => {
	ReactDOM.render(
		<App 
			value={store.getState()} 
			onINC={() => 
				store.dispatch({ type: 'INC' })
			}
			onDEC={() =>
				store.dispatch({ type: 'DEC' })
			}
		/>,
		document.querySelector('#root')
	)	
}

// SUBSCRIBE
render() // call it once to show the initial state
store.subscribe(render)
