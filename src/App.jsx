import './App.css'
import Main from "./components/Main"
import Form from './components/Form'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path:"/",
    element: <Main />
  },
  {
    path:"/form",
    element:<Form/>
  }
])

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
