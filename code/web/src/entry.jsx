/*
  http://bit.ly/2DTXGpe - `@babel/polyfill` has been deprecated.
  If you need to polyfill certain JS features, uncomment the two imports below.
*/
// import 'core-js/stable'
// import 'regenerator-runtime/runtime' // Needed to polyfill async / await.

/*
  Import our top-level scss file.
  All other scss files should be imported in `styles.scss`.
*/
import './styles/styles.scss'
import {BrowserRouter} from 'react-router-dom'

// Import React.
import React from 'react'
import ReactDOM from 'react-dom'

// Import our top-level component.
import App from './App.jsx'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {store, persistor} from './redux/store'

// Mount our app.
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <React.Fragment>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.Fragment>
      </React.StrictMode>
    </PersistGate>
  </Provider>,

  document.querySelector('#app'),
)
