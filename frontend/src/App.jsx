import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import LinkPage from './pages/Linkpage/LinkPage';
import RequireAuth from './pages/RequireAuth/RequireAuth';
import Lounge from './pages/Lounge/Lounge';
import Unauthorized from './pages/Unauthorized/Unauthorized';
import Home from './pages/Home/Home';
import Recruiter from './pages/Recruiter/Recruiter';
import Admin from './pages/Admin/Admin';
import ErrorPage from './pages/ErrorPage/ErrorPage';

const ROLES = {
  'User': 2001,
  'Recruiter': 1984,
  'Admin': 5150
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="Register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Recruiter]} />}>
          <Route path="recruiter" element={<Recruiter />} />
        </Route>


        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Recruiter, ROLES.Admin]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<ErrorPage/>} />
      </Route>
    </Routes>
  );
}

export default App;