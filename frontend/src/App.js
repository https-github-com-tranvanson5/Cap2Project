import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
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
} from './routes';
import ProtectedRoute from './routes/ProtectedRoute';
// import { renderRoutes } from './utils/route.utils';
// import Home from './pages/Home';
import DefaultLayout from './Layouts/DefaultLayout';
import Loading from './components/Loading/Loading';

import 'react-toastify/dist/ReactToastify.css';

import { renderRoutes } from './utils/route.utils';
import Home from './pages/Home';

function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.login?.isFetching);
    const user = useSelector((state) => state.auth.login?.currentUser);
    // console.log(user.roles[0].authority)

    useEffect(() => {
        if (user) {
            return user
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (typeof isAuth == false) {
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
                                isAllowed={isAuth && user?.roles[0]?.authority === 'ROLE_PM'}
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
                                isAllowed={isAuth && user?.roles[0]?.authority === 'ROLE_AMIN'}
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
