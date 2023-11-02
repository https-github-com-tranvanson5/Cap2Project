import SidebarLayout from '~/Layouts/SidebarLayout';
import config from '~/config';
import CV from '~/pages/CV';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
// import Recruiter from '~/pages/Recruiter/Recruiter';
import Recruiter from '~/pages/Recruiter/RecruiterNews/RecruiterNews';
import RecruiterPostManage from '~/pages/Recruiter/Post';
import RecruiterManagePost from '~/pages/Recruiter/ManagePost';
import ListPostOfRecruiter from '~/pages/Recruiter/RecruiterSaved/ListRecruitmentPost';
import ListPostRecruiter from '~/pages/Recruiter/RecruiterNews/RecruiterNews';
import Accounts from '~/pages/account/Accounts';
import Dashboard from '~/pages/admin/Dashboard';
import UsersManage from '~/pages/admin/UsersManage';
import Settings from '~/pages/settings/Setting';
import ManageCandidates from '~/pages/Recruiter/ManageCandidates';
import RecruitmentPage from '~/pages/RecruitmentPage/RecruimentPage';
import RecruitmentDetail from '~/pages/RecruitmentDetail/RecruitmentDetail';
import RecruiterPost from '~/pages/Recruiter/RecruiterPost/Component/RecruiterPost';
import SavedRecruitment from '~/pages/SavePost/SavedRecruitment/SavedRecruitment';

export const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.accounts, component: Accounts, layout: null },
];

export const privateRoutes = [
    { path: config.routes.recruitmentpage, component: RecruitmentPage },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.settings, component: Settings },
    { path: config.routes.cv, component: CV },
    { path: config.routes.recruitmentdetail, component: RecruitmentDetail },
    {
        path: config.routes.saverecruitment,
        component: SavedRecruitment,
        layout: SidebarLayout,
    },
];

export const userPrivateRoutes = [];

export const recruiterPrivateRoutes = [
    {
        path: config.routes.editPost,
        component: RecruiterPost,
        layout: SidebarLayout,
    },
    {
        path: config.routes.recruiterpost,
        component: RecruiterPost,
        layout: SidebarLayout,
    },
    {
        path: config.routes.recruiter,
        component: Recruiter,
        layout: SidebarLayout,
    },
    {
        path: config.routes.recruiterPostSidebar,
        component: RecruiterPostManage,
        layout: SidebarLayout,
    },
    {
        path: config.routes.recruiterPostManageSidebar,
        component: RecruiterManagePost,
        layout: SidebarLayout,
    },
    {
        path: config.routes.recruiterManageCandidates,
        component: ManageCandidates,
        layout: SidebarLayout,
    },
    {
        path: config.routes.ListRecruitmentPost,
        component: ListPostOfRecruiter,
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
