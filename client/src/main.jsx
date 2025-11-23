import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import { persistor, store } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate oading = {<div>Loading...</div>} persistor={persistor}>
      <ToastContainer />
      <App />

    </PersistGate>
    </Provider>
  </StrictMode>,
)
