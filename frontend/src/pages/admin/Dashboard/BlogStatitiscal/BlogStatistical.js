import React from "react";
import BlogCard from "~/pages/admin/Dashboard/BlogStatitiscal/BlogCard";
import BlogLineChart from "~/pages/admin/Dashboard/BlogStatitiscal/BlogLineChart";
import BlogPieChart from "./BlogPieChart";

function BlogStatistical() {
    return (
        <div>
            <BlogCard></BlogCard>
            <BlogLineChart></BlogLineChart>
            <BlogPieChart></BlogPieChart>
        </div>
    );
}
export default BlogStatistical;