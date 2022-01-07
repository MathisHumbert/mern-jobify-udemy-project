import { useAppContext } from '../context/appContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  // if there is no user loged in we redirect to the landing page
  if (!user) {
    return <Navigate to='/landing' />;
  }
  // if there is one user loged in we allow him to access pages
  return children;
};

export default ProtectedRoute;
