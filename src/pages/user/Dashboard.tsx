import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';

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

    <DashboardLayout>
      <h1 className="text-2xl font-bold m-auto">Welcome to your User Dashboard</h1>
    </DashboardLayout>
  );
};

export default UserDashboard;
