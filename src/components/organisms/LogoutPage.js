import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    sessionStorage.clear();
    navigate('/login');
  }, [navigate]);

  return null;
}

export default LogoutPage;
