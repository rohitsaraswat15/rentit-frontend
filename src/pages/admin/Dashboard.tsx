import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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
    <div className="p-6">
      <h1 className="text-2xl mt-20 font-bold mb-4">Welcome to Admin Dashboard</h1>
    </div>
  );
};

export default AdminDashboard;
