import { Navigate, useLocation } from 'react-router-dom';
import { getKgcAdminToken } from './handelAdminToken';

const ProtectedRoute = ({ children }: any) => {
  const location = useLocation();
  const token = getKgcAdminToken();
  if (!token) {
    return (
      <Navigate to="/auth/signin" state={{ from: location }} replace></Navigate>
    );
  }

  return children;
};

export default ProtectedRoute;
