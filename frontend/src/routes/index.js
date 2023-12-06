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
import CalwContent from '~/pages/Calw/calwContent/CalwContent';
import RecruiterBlock from '~/pages/Recruiter/RecruiterBlock/RecruiterBlock';
import ManageCV from '~/pages/CV/ManageCv/ManageCv';
import Blog from '~/pages/Blogs/Blog';
import PostBlog from '~/pages/Blogs/BlogController/PostBlog/PostBlog';
import BlogController from '~/pages/Blogs/BlogController/BlogController';
import ContentBlog from '~/pages/Blogs/BlogContent/BlogContent';
import BlogDetail from '~/pages/Blogs/BlogDetail/BlogDetail';
import BlogContentRecruiter from '~/pages/Blogs/BlogContentRecruiter';
import MyBlog from '~/pages/Blogs/BlogController/MyBlog/MyBlog';
import CawlDetail from '~/pages/Calw/CawlDetail/CawlDetail';



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
    { path: config.routes.redetail, component: CawlDetail },
    {
        path: config.routes.saverecruitment,
        component: SavedRecruitment,
        layout: SidebarLayout,
    },
    { path: config.routes.re, component: CalwContent },
    {
        path: config.routes.managecv,
        component: ManageCV,
        layout: SidebarLayout,
    },
    {
        path: config.routes.editcv,
        component: CV,
    },
    { path: config.routes.blog, component: Blog },
    { path: config.routes.postblog, component: PostBlog },
    { path: config.routes.createblog, component: BlogController },
    { path: config.routes.manageBlog, component: PostBlog },
    { path: config.routes.blogcontent, component: ContentBlog },
    { path: config.routes.blogdetail, component: BlogDetail },
    { path: config.routes.blogdetail2, component: BlogDetail },
    { path: config.routes.myblog, component: MyBlog },
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
    {
        path: config.routes.ListRecruitmentPostBlock,
        component: RecruiterBlock,
        layout: SidebarLayout,
    },
    {
        path: config.routes.blogcontentrecuiter,
        component: BlogContentRecruiter,
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
