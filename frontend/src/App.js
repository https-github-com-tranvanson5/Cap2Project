import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import config from '~/config';

// --- ROUTES ---
import {
    adminPrivateRoutes,
    privateRoutes,
    publicRoutes,
    recruiterPrivateRoutes,
} from '~/routers';
import ProtectedRoute from './routers/ProtectedRoute';
import { fetchUser } from './pages/Accounts/accountsSlice';
import { renderRoutes } from './utils/route.utils';
import Home from './pages/Home';
import {
    accountsDataSelector,
    isAuthSelector,
} from '~/redux/Selectors/authSelector';
import DefaultLayout from './Layouts/DefaultLayout';
import Loading from './components/Loading/Loading';

import 'react-toastify/dist/ReactToastify.css';

function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthSelector);
    const user = useSelector(accountsDataSelector);

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    if (typeof isAuth === 'undefined') {
        return <Loading></Loading>;
    }

    return (
        <Router>
            <div className="App">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <Routes>
                    {/* PUBLIC ROUTES */}
                    {renderRoutes(publicRoutes)}

                    {/* PRIVATE ROUTES */}
                    {/* For ALL */}
                    <Route
                        element={
                            <ProtectedRoute
                                redirectPath={config.routes.accounts}
                                isAllowed={isAuth}
                            />
                        }
                    >
                        {renderRoutes(privateRoutes)}
                    </Route>

                    {/* For Recruiter */}
                    <Route
                        element={
                            <ProtectedRoute
                                redirectPath={config.routes.home}
                                isAllowed={isAuth && user?.role === 'recruiter'}
                            ></ProtectedRoute>
                        }
                    >
                        {renderRoutes(recruiterPrivateRoutes)}
                    </Route>
                    {/* For Admin */}
                    <Route
                        element={
                            <ProtectedRoute
                                redirectPath={config.routes.home}
                                isAllowed={isAuth && user?.role === 'admin'}
                            ></ProtectedRoute>
                        }
                    >
                        {renderRoutes(adminPrivateRoutes)}
                    </Route>

                    {/* NOTE FOUND */}
                    <Route
                        path="*"
                        element={
                            <DefaultLayout>
                                <Home />
                            </DefaultLayout>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
