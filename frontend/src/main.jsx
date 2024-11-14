import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Me from './pages/Me/Me.jsx'
import Register from './pages/Register/Register.jsx'
import './index.scss'
import App from './App.jsx'

import {RouterProvider,createBrowserRouter}from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import BookForm from './pages/BookForm/BookForm.jsx'
import Home from './pages/Home/Home.jsx'
import LayOut from './components/LayOut/LayOut.jsx'
import BookList from './pages/BookList/BookList.jsx'
import Options from './components/Options/Options.jsx'
import Erros from './components/Erros/Erros.jsx'
import SingleBook from './pages/SingleBook/SingleBook.jsx'
import UpdateBook from './pages/UpdateBook/UpdateBook.jsx'


const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
  },
  {
    path:'/',
    element:<Home />,
  },

  {
    path:'/error',
    element:<Erros />,
  },

  {
    element:<LayOut />,
    children:[
      {
        path:'api/auth/me',
        element:<Me />,
      },
      {
        path:'api/auth/login',
        element:<Login />,
      },
      {
        path:'api/auth/register',
        element:<Register />,
      },
      {
        path:'api/books/{id}',
        element:<BookForm />,
      },
      {
        path:'api/books',
        element:<BookList />,
      },
      {
        path:'/options',
        element:<Options />,
      },
      {
        path:'update/books/:id',
        element:<UpdateBook />,
      },
      {
        path:'info/books/:id',
        element:<SingleBook />,
      },
    ]
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
