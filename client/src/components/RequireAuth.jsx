// RequireAuth component placeholder
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
export default function RequireAuth({ children }) {
  const token = useSelector((s) => s.auth.token);
  const loc = useLocation();
  if (!token)
    return <Navigate to='/admin/login' state={{ from: loc }} replace />;
  return children;
}
