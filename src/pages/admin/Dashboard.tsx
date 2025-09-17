import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

 useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (!user) {
    navigate('/login');
  } else if (user.role !== 'admin') {
    navigate('/');
  }
}, [navigate]);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4 mt-15">Admin Dashboard</h1>
      {/* Your user dashboard content here */}
    </DashboardLayout>
  );
};

export default AdminDashboard;
