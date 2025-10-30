import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuthContext } from '../../context/useAuthContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

 useEffect(() => {
  
  if (!user) {
    navigate('/login');
  } else if (user.role !== 'admin') {
    navigate('/');
  }
}, [user, navigate]);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4 mt-15">Admin Dashboard</h1>
      {/* Your user dashboard content here */}
    </DashboardLayout>
  );
};

export default AdminDashboard;
