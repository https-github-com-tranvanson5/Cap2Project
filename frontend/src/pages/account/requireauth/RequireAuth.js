import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    var roleArr = auth?.roles;
    const dataUserRole = roleArr?.find(function (role) {
        return role;
    });
    console.log(roleArr);
    console.log(dataUserRole);

    return dataUserRole ? (
        <Outlet />
    ) : auth?.user ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
