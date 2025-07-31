import React from "react";
import { Link, NavLink } from "react-router-dom";
import { LuLayoutDashboard, LuUpload } from "react-icons/lu";
import { BsBoxes } from "react-icons/bs";
import { GoGitPullRequestDraft, GoHome } from "react-icons/go";
import { RiMessage2Line } from "react-icons/ri";
import { IoLogOutOutline, IoSettingsOutline, IoTrashBinOutline } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import RentItLogo from '../../assets/logo/RentIt.png';


const Sidebar = ({ handleLogout, sidebarWidth, collapsed, setCollapsed }: {
  handleLogout: () => void; sidebarWidth: number; collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isAdmin = user?.role === 'admin';

  return (
    <div
      className={`flex flex-col h-screen min-h-screen bg-gray-900 text-white transition-[width] duration-200 ease-in-out ${collapsed ? 'w-20' : 'w-64'} relative z-10`}
      style={{ width: sidebarWidth }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-2 border-b gap-3 border-gray-700">
        <Link to="/" className="flex items-center gap-1">
          <img src={RentItLogo} alt="Logo" className={`transition-all text-2xl ${collapsed ? 'w-30' : 'w-24'}`} />
          {/* {!collapsed && <span className="font-bold text-indigo-400 text-lg">Rentit</span>} */}
        </Link>
        <button onClick={() => setCollapsed(!collapsed)} className="text-xl text-white md:visible lg:hidden">
          <FiMenu />
        </button>
      </div>
        <div className="flex gap-3 mt-3 p-4">
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center bg-red-400 justify-center text-white font-bold text-xl">
        {user.name
          .split(" ")
          .map((word: string, index: number, arr: string[]) =>
            index === 0 || index === arr.length - 1 ? word.charAt(0) : ""
          )
          .join("")}
      </div>

      <span className="font-semibold text-gray-200 flex gap-4 items-center relative">
        {user.name} ({user.role})
      </span>
        </div>
       

      {/* Navigation */}
      <div className="flex flex-col gap-1 p-4 mt-1 text-sm">
        <SidebarLink to="/" icon={<GoHome />} label="Home" collapsed={collapsed} />

        <SidebarLink to={`/${user.role}-dashboard`} icon={<LuLayoutDashboard />} label="Your Dashboard" collapsed={collapsed} />

        <SidebarLink to="/messages" icon={<RiMessage2Line />} label="Message" collapsed={collapsed} />
        <SidebarLink to="/post-product" icon={<LuUpload />} label="Post Product" collapsed={collapsed} />

        {/* user links */}
        {!isAdmin && (
          <>
            <SidebarLink to="/myProducts" icon={<BsBoxes />} label="My Products" collapsed={collapsed} />
            <SidebarLink to="/requests" icon={<GoGitPullRequestDraft />} label="Rent Request" collapsed={collapsed} />
          </>
        )}

        {/* Admin */}
        {isAdmin && (
          <>
            <SidebarLink to="/products" icon={<BsBoxes />} label="All Products" collapsed={collapsed} />
            <SidebarLink to="/requests" icon={<GoGitPullRequestDraft />} label="Request for Boost" collapsed={collapsed} />
            <SidebarLink to="/bin" icon={<IoTrashBinOutline />} label="Bin" collapsed={collapsed} />
          </>
        )}

        <div className="border-t border-gray-700 mt-4 pt-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full gap-6 hover:bg-gray-700 px-3 py-2 rounded transition"
          >
            <IoLogOutOutline className="text-2xl" />
            {!collapsed && <span>Logout</span>}
          </button>
          {/* Admin */}
          {isAdmin && (
            <SidebarLink to="/admin-settings" icon={<IoSettingsOutline />} label="User Settings" collapsed={collapsed} />
          )}
          {/* user */}
          {!isAdmin && (
            <SidebarLink to="/settings" icon={<IoSettingsOutline />} label="Settings" collapsed={collapsed} />
          )}

        </div>
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode; // safer than JSX.Element
  label: string;
  collapsed: boolean;
}

const SidebarLink = ({ to, icon, label, collapsed }: SidebarLinkProps) => (

  <NavLink
    to={to}
    className={({ isActive }) =>
      `mt-2 transition flex gap-4 items-center p-2 rounded ${isActive ? 'bg-gray-700 text-white' : 'text-gray-100 hover:bg-gray-700'
      }`
    }
  >
    <span className="text-2xl">{icon}</span>
    {!collapsed && <span>{label}</span>}
  </NavLink>
);

export default Sidebar;
