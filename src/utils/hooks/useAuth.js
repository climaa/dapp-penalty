import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useAuth() {
  const navigate = useNavigate();

  useEffect(() => {
	const user = JSON.parse(sessionStorage.getItem('user'));
	if (!user || !user.isLoggedIn) {
	  navigate('/login');
	}
  }, [navigate]);
}

export default useAuth;