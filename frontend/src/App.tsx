import { Route, Routes } from 'react-router-dom';
import AppLayout from '@layouts/AppLayout';
import HomePage from '@pages/HomePage';
import BlogPage from '@pages/BlogPage';
import Login from '@components/admin/Login';
import AdminLayout from '@layouts/AdminLayout';
import AdminDashboard from '@pages/admin/AdminDashboard';
import AdminAddBlog from '@pages/admin/AdminAddBlog';
import AdminBlogList from '@pages/admin/AdminBlogList';
import AdminComments from '@pages/admin/AdminComments';
import ProtectedRoute from '@components/ProtectedRoute';
import PersistLogin from '@components/PersistLogin';


export default function App() {
  return (
    <Routes>

      <Route element={<PersistLogin />}>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path='blog/:id' element={<BlogPage />} />

        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path='blogs/new' element={<AdminAddBlog />} />
            <Route path='blogs' element={<AdminBlogList />} />
            <Route path='comments' element={<AdminComments />} />

          </Route>
        </Route>
      </Route>

      <Route path='/login' element={<Login />} />
    </Routes>
  )
}
