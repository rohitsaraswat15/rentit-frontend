import React, { useRef, useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom'; // Outlet is where the child routes will be rendered
   

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  const [sidebarWidth, setSidebarWidth] = useState(256);
    const [collapsed, setCollapsed] = useState(false);  
  const isDragging = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
  if (collapsed) {
    setSidebarWidth(80);
  } else {
    setSidebarWidth(256);
  }
}, [collapsed]);

  // Handle responsive auto-collapse
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
         setCollapsed(true);
        setSidebarWidth(80); // collapse to icons
      } else {
         setCollapsed(false);
        setSidebarWidth(256);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse dragging to resize sidebar
  const startDragging = () => (isDragging.current = true);
  const stopDragging = () => (isDragging.current = false);

  const handleDragging = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const newWidth = e.clientX;
    if (newWidth >= 80 && newWidth <= 400) {
      setSidebarWidth(newWidth);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleDragging);
    window.addEventListener('mouseup', stopDragging);
    return () => {
      window.removeEventListener('mousemove', handleDragging);
      window.removeEventListener('mouseup', stopDragging);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`relative top-15 z-10 flex-shrink-0 transition-all duration-150 ease-in-out ${collapsed ? 'w-20' : 'w-64'} hidden sm:hidden md:block`}
        style={{ width: `${sidebarWidth}px`, minWidth: '80px', maxWidth: '400px' }}
      >
        <Sidebar handleLogout={handleLogout} sidebarWidth={sidebarWidth} collapsed={collapsed}
          setCollapsed={setCollapsed} />
        <div
          onMouseDown={startDragging}
          className="absolute top-0 right-0 w-1 h-full cursor-ew-resize z-50"
        />
      </div>

      {/* Main */}
      <main className="flex-1 overflow-y-auto bg-white p-4">
        {children}
      </main>

      


    </div>
  );
};

export default DashboardLayout;
