import PropTypes from 'prop-types';
import { Outlet, Navigate } from 'react-router-dom';
function ProtectedRoute({ redirectPath, isAllowed, children }) {
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
}

ProtectedRoute.propTypes = {
    isAllowed: PropTypes.bool,
    redirectPath: PropTypes.string,
};

export default ProtectedRoute;
