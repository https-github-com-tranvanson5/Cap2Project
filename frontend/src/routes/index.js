import SidebarLayout from '~/Layouts/SidebarLayout';
import config from '~/config';
import CV from '~/pages/CV';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Recruiter from '~/pages/Recruiter/Recruiter';
import RecruitmentPage from '~/pages/RecruitmentPage/RecruitmentPage';
import Accounts from '~/pages/account/Accounts';
import Dashboard from '~/pages/admin/Dashboard';
import UsersManage from '~/pages/admin/UsersManage';
import Settings from '~/pages/settings/Setting';

export const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.accounts, component: Accounts, layout: null },
    { path: config.routes.recruitmentpage, component: RecruitmentPage },
];

export const privateRoutes = [
    { path: config.routes.recruitmentpage, component: RecruitmentPage },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.settings, component: Settings },
    { path: config.routes.cv, component: CV },
];

export const userPrivateRoutes = [
];

export const recruiterPrivateRoutes = [
    {
        path: config.routes.recruiter,
        component: Recruiter,
        layout: SidebarLayout,
    },
];

export const adminPrivateRoutes = [
    { path: config.routes.admin, component: Dashboard, layout: SidebarLayout },
    {
        path: config.routes.usersManagement,
        component: UsersManage,
        layout: SidebarLayout,
    },
];
