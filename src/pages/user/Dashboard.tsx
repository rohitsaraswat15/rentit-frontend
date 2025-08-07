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
<<<<<<< Updated upstream
      <h1 className="text-2xl font-bold m-auto">Welcome to your User Dashboard</h1>
=======
      <h1 className="text-2xl font-bold mb-4 mt-15">User Dashboard</h1>
      {/* Your user dashboard content here */}
>>>>>>> Stashed changes
    </DashboardLayout>
  );
};

export default UserDashboard;
