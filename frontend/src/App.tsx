import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from '@layouts/AppLayout'
import HomePage from './pages/HomePage'
import BlogPage from '@pages/BlogPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/blog/:id' element={<BlogPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}
