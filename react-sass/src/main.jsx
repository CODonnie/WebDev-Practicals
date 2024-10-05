import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ItemContextProvider from './context/itemContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
		<BrowserRouter>
			<ItemContextProvider>
				<App />
			</ItemContextProvider>
		</BrowserRouter>
  </StrictMode>,
)
