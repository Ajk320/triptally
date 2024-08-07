import './App.css'
import Main from "./components/Main"
import Form from './components/Form'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ExpenseList from './components/ExpenseList'

const router = createBrowserRouter([
  {
    path:"/",
    element: <Main />
  },
  {
    path:"/form",
    element:<Form/>
  },
  {
    path:"/expenses",
    element:<ExpenseList/>
  }
  
])

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
