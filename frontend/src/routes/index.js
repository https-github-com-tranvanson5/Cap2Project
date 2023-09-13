import SidebarLayout from "~/Layouts/SidebarLayout";
import config from "~/config";
import Home from "~/pages/Home";
import Recruiter from "~/pages/Recruiter/Recruiter";
import RecruitmentPage from "~/pages/RecruitmentPage/RecruitmentPage";
import Accounts from "~/pages/account/Accounts";
import Admin from "~/pages/admin/Admin";


export const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.accounts, component: Accounts, layout: null },
    { path: config.routes.recruitmentpage, component: RecruitmentPage },
];

export const privateRoutes = [
    { path: config.routes.recruitmentpage, component: RecruitmentPage },
];

export const userPrivateRoutes = [];

export const recruiterPrivateRoutes = [
    {
        path: config.routes.recruiter,
        component: Recruiter,
        layout: SidebarLayout,
    },
];

export const adminPrivateRoutes = [
    { path: config.routes.admin, component: Admin},
];
