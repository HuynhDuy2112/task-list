import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import About from '../pages/about/About'
import Dashboard from '../pages/dashboard/Dashboard'
import Details from '../pages/details/Details'
import './App.scss'

function App() {
  /* const route = [
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: '/about',
      element: <About />,
    },
    {
      path: '/details',
      element: <Details />,
    },
  ]

  return (
    <Router>
      <nav>
        {route.map((item, i) => (
          <Link key={i} to={item.path}>
            {item.path === '/' ? 'Home' : item.path}
          </Link>
        ))}
      </nav>

      <Routes>
        {route.map((item, i) => (
          <Route key={i} path={item.path} element={item.element} />
        ))}
      </Routes>
    </Router>
  ) */

  return (
    <>
      <Details />
    </>
  )
}

export default App
