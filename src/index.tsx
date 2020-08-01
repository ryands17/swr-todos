import * as React from 'react'
import ReactDOM from 'react-dom'

import 'todomvc-app-css/index.css'
import 'index.css'

import { App } from 'App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
  onSuccess: () => console.log('service worker is running!'),
  onUpdate: () => console.log('Your app has been updated in the background!'),
})
