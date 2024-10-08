import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 1. Import the extendTheme function
// import { extendTheme } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc
// const colors = {
//   brand: {
//     900: '#1a365d',
//     800: '#153e75',
//     700: '#2a69ac',
//   },
// }

// const theme = extendTheme({ colors })

// 3. Pass the `theme` prop to the `ChakraProvider`
// import { ChakraProvider } from '@chakra-ui/react'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <ChakraProvider>
      <App />
    </ChakraProvider> */}
    <App />
  </React.StrictMode>,
)
