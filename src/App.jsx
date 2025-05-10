import React from 'react'

import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import Home from "./Page/Home"
import Layout from "./Layout/Layout"
import Contact from "./Page/Contact"
import Team from './Page/Team'
import ErrorPage from './components/ErrorPage'
import News from './Page/News'
import Dictonary from './Page/Dictonary'
import Projects from './Page/Projects'
import Hero from './components/Home/Hero'
import Statistics from './Page/Statistics'
import NewsDetail from './Page/NewsDetail'
import Example from './Page/Example'
import DictonaryDetail from './Page/DictonaryDetail'


export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <  Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/team",
          element: <Team />,
        },
        {
          path: "/projects",
          element: <Projects />,
        },
        {
          path: "/example",
          element: <Example />,
        },
        {
          path: "/dictonary",
          element: <Dictonary />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/news",
          element: <News />,
        },
        {
          path: "/news/:id",
          element: <NewsDetail />,
        },
        {
          path: "/text/:id",
          element: <DictonaryDetail />,
        },
        {
          path: "/websites",
          element: <Hero />,
        },
        {
          path: "/statistic",
          element: <Statistics />,
        },
        {
          path: "*",
          element: <ErrorPage />,
        },
      ]
    },

  ])
  return <RouterProvider router={routes} />
}
