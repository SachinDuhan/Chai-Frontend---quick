import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './components/Login/Login.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Signup from './components/Login/Signup.jsx'
import Home from './components/Home/Home.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Watch from "./components/Watch/Watch.jsx"

const router = createBrowserRouter([
  {
    path: '/',
    element:<App/>,
    children: [
      {path: "", element: <Home/>},
      {path: "login", element: <Login/>},
      {path: "signup", element: <Signup/>},
      {path: "video/:videoId", element: <Watch/>},
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
