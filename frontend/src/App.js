
import { Routes, Route } from 'react-router-dom';
import Layout from './pages/layout/Layout';
import Login from './pages/account/login/Login';
import Register from './pages/account/register/Regsiter';
import LinkPage from './pages/linkpage/LinkPage';
import Unauthorized from './pages/account/unauthorized/Unauthorized';
import Home from './pages/home/Home';
import Recruiter from './pages/recruiter/Recruiter';
import Admin from './pages/admin/Admin';
import RequireAuth from './pages/account/requireauth/RequireAuth';
import Lounge from './pages/account/lounge/Lounge';
import Missing from './pages/missing/Missing';

const ROLES = {
    User: 'ROLE_USER',
    Recruiter: 'ROLE_PM',
    Admin: 'ROLE_ADMIN',
};

function App() {
    console.log([ROLES.Admin])
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public routes */}
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="linkpage" element={<LinkPage />} />
                <Route path="unauthorized" element={<Unauthorized />} />

                {/* we want to protect these routes */}
                <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                    <Route path="/" element={<Home />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.Recruiter]} />}>
                    <Route path="/recruiter" element={<Recruiter />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                    <Route path="/admin" element={<Admin />} />
                </Route>

                <Route
                    element={
                        <RequireAuth
                            allowedRoles={[ROLES.Recruiter, ROLES.Admin]}
                        />
                    }
                >
                    <Route path="/lounge" element={<Lounge />} />
                </Route>

                {/* catch all */}
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    );
}

export default App;
