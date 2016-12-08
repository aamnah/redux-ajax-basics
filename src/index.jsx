// Basic AJAX Example
import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import axios from 'axios'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const logger = createLogger()
const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/posts'

// VIEW
class Posts extends Component {
  componentDidMount () {
    store.dispatch(fetchData(API_ENDPOINT))
  }
  
  render () {
    return (
      <div>
        <h3>post.title</h3>
        <p>post.body</p>     
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.data
  }
}
connect(mapStateToProps)(Posts)


// ACTIONS
const receiveData = (json) => {
  return {
    type: 'RECV_DATA',
    data: json
  }
}
const receiveError = (json) => {
  return {
    type: 'RECV_ERROR',
    data: json
  }
}
const requestData = () => {
  return {
    type: 'REQ_DATA',
  }
}
const fetchData = (url) => {
  return (dispatch) => {
    dispatch(requestData())
    return axios.get(url)
      .then(response => {
        store.dispatch(receiveData(response.data))
      })
      .catch(error => {
        store.dispatch(receiveError(error.message))
      })
  }
}

// REDUCERS
const initialState = {
  isFetching: false,
  error: false,
  data: []
}
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'REQ_DATA':
      return { ...state, 
        isFetching: true,
        error: false,
      }
    case 'RECV_DATA':
      return { ...state, 
        isFetching: false,
        error: false,
        receivedAt: +new Date,
        data: action.data.map(post => {
          return {
            id: post.id,
            title: post.title,
            body: post.body
          }
        })
     }
    case 'RECV_ERROR':
      return { ...state, 
        isFetching: false,
        error: true,
        data: action.data
     }
    default:
      return state
  }
}

// STORE
const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware, 
    logger
  )
)

// RENDER
render(
  <Provider store={store}>
    <Posts results={store.getState().data} />
  </Provider>,
  document.querySelector('#root')
)
