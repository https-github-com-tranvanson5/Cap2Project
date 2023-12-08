import React from "react";
import BlogCard from "~/pages/admin/Dashboard/BlogStatitiscal/BlogCard";
import BlogLineChart from "~/pages/admin/Dashboard/BlogStatitiscal/BlogLineChart";

export default function BlogStatistical() {
    return (
        <div>
            <BlogCard></BlogCard>
            <BlogLineChart></BlogLineChart>
        </div>
    );
}