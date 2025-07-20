import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// import Sidebar from '../../components/layout/Sidebar';

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (!user) {
      navigate('/login');
    } else if (user.role !== 'user') {
      navigate('/');
    }
  }, [navigate]);

  return (
     
    <div className="p-6">
      <h1 className="text-2xl mt-20 font-bold mb-4">Welcome to Admin Dashboard</h1>
    </div>

  );
};

export default UserDashboard;
