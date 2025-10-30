import { useLocation, NavLink } from 'react-router-dom';
import { useAuthContext } from '../../context/useAuthContext';

const ProductPageLinks: React.FC = () => {
     const { user } = useAuthContext();
    const isAdmin = user?.role === 'admin';

    return (
        <>
            <div className="relative md:hidden flex align-bottom gap-2 justify-baseline w-full p-2 mt-12 border-b-gray-300 border-b-1 ">
                <ProductLink to="/postproduct" label="Post" />
                {!isAdmin && (
                    <ProductLink to="/myproducts" label="My Products" />
                )}

                {isAdmin && (
                    <>
                        <ProductLink to="/allproducts" label="All Products" />
                        <ProductLink to="/admin-bin" label="Bin" />
                    </>
                )}
            </div>

        </>
    );
};

interface ProductPageLinkProps {
    to: string;
    label: string;
}

const ProductLink = ({ to, label }: ProductPageLinkProps) => {
    const location = useLocation();

    const isActive = location.pathname === to;

    return (
        <NavLink
            to={to}
            className={`flex items-center justify-center cursor-pointer left-4 w-fit px-4 py-1 rounded-sm ${isActive ? 'font-semibold text-white bg-purple-400 bottom-0' : 'text-gray-700 bg-gray-200'}`}
        >

            <span className="text-md">{label}</span>
            {/* {isActive && (
                <div className="w-20 h-1 bg-purple-500 absolute bottom-0 rounded-full transform translate-x-1/22 z-50"></div>
            )} */}
        </NavLink>
    )
};

export default ProductPageLinks;
