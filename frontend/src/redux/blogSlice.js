import { createSlice } from '@reduxjs/toolkit';

const allBlogSlice = createSlice({
    name: 'allBlog',
    initialState: {
        blogs: {
            allBlogs: null,
            isFetching: false,
            error: false,
            blog: null,
        },
        blogRecruiter: {
            allBLogRecruiter: null,
            isFetching: false,
            error: false,
            blogRecruiter: null,
        },
        postBlog: {
            isFetching: false,
            error: false,
            success: false,
        },
        editBLog: {
            isFetching: false,
            error: false,
            success: false,
        },
        msg: '',
    },
    reducers: {
        //all blog
        getAllBlogStart: (state) => {
            state.blogs.isFetching = true;
        },
        getAllBlogSuccess: (state, action) => {
            state.blogs.isFetching = false;
            state.blogs.allBlogs = action.payload;
        },
        getAllBlogFailed: (state) => {
            state.blogs.isFetching = false;
            state.blogs.error = true;
        },
        //blog
        getBlogStart: (state) => {
            state.blogs.isFetching = true;
        },
        getBlogSuccess: (state, action) => {
            state.blogs.isFetching = false;
            state.blogs.blog = action.payload;
        },
        getBlogFailed: (state) => {
            state.blogs.isFetching = false;
            state.blogs.error = true;
        },
        //all blog recruiter
        getAllBlogRecruiterStart: (state) => {
            state.blogRecruiter.isFetching = true;
        },
        getAllBlogRecruiterSuccess: (state, action) => {
            state.blogRecruiter.isFetching = false;
            state.blogRecruiter.allBLogRecruiter = action.payload;
        },
        getAllBlogRecruiterFailed: (state) => {
            state.blogRecruiter.isFetching = false;
            state.blogRecruiter.error = true;
        },
        // get blog for recruiter
        getBLogRecruiterStart: (state) => {
            state.blogRecruiter.isFetching = true;
        },
        getBlogRecruiterSuccess: (state, action) => {
            state.blogRecruiter.isFetching = false;
            state.blogRecruiter.blogRecruiter = action.payload;
        },
        getBlogbRecruiterFailed: (state) => {
            state.blogRecruiter.isFetching = false;
            state.blogRecruiter.error = true;
        },

        //post blog
        postBlogStart: (state) => {
            state.postBlog.isFetching = true;
        },
        postBlogSuccess: (state) => {
            state.postBlog.isFetching = false;
            state.postBlog.error = false;
            state.postBlog.success = true;
        },
        postBlogFailed: (state) => {
            state.postBlog.isFetching = false;
            state.postBlog.error = true;
            state.postBlog.success = false;
        },
        // edit blog
        editBlogtart: (state) => {
            state.editBLog.isFetching = true;
        },
        editBlogSuccess: (state) => {
            state.editBLog.isFetching = false;
            state.editBLog.error = false;
            state.editBLog.success = true;
        },
        editBlogFailed: (state) => {
            state.editBLog.isFetching = false;
            state.editBLog.error = true;
            state.editBLog.success = false;
        },
        //delete blog
        deleteBlogStart: (state) => {
            state.blogRecruiter.isFetching = true;
        },
        deleteBlogSuccess: (state, action) => {
            state.blogRecruiter.isFetching = false;
            state.msg = action.payload;
        },
        deleteBlogFailed: (state, action) => {
            state.blogRecruiter.isFetching = false;
            state.blogRecruiter.error = true;
            state.msg = action.payload;
        },
    },
});

export const {
    //All blog for all roles
    getAllBlogStart,
    getAllBlogSuccess,
    getAllBlogFailed,
    //detail blog
    getBlogStart,
    getBlogSuccess,
    getBlogFailed,
    //All blog for recruiter
    getAllBlogRecruiterStart,
    getAllBlogRecruiterSuccess,
    getAllBlogRecruiterFailed,
    //detail blog
    getBLogRecruiterStart,
    getBlogRecruiterSuccess,
    getBlogbRecruiterFailed,
    //post blog
    postBlogStart,
    postBlogSuccess,
    postBlogFailed,
    //edit blog
    editBlogtart,
    editBlogSuccess,
    editBlogFailed,
    //delete blog recruiter
    deleteBlogStart,
    deleteBlogSuccess,
    deleteBlogFailed,
    //
    getCareerStart,
    getCareerSuccess,
    getCareerFailed,
} = allBlogSlice.actions;

export default allBlogSlice.reducer;
