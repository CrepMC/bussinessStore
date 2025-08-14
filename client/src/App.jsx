// App component placeholder
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import BusinessPublic from './pages/BusinessPublic';
import BusinessClaim from './pages/BusinessClaim';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import RequireAuth from './components/RequireAuth';
import RequireAdmin from './components/RequireAdmin';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 16, borderBottom: '1px solid #eee' }}>
        <Link to='/'>Home</Link> | <Link to='/claim'>Claim</Link> |{' '}
        <Link to='/admin'>Admin</Link>
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/b/:slug' element={<BusinessPublic />} />
        <Route path='/claim' element={<BusinessClaim />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route
          path='/admin'
          element={
            <RequireAuth>
              <RequireAdmin>
                <AdminPanel />
              </RequireAdmin>
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
