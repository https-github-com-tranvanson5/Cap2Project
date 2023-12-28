import BlogCard from "~/pages/admin/Dashboard/BlogStatitiscal/BlogCard";
import BlogLineChart from "~/pages/admin/Dashboard/BlogStatitiscal/BlogLineChart";
import BlogPieChart from "./BlogPieChart";

function BlogStatistical() {
    return (
        <div>
            <BlogCard></BlogCard>
            <br></br>
            <BlogLineChart></BlogLineChart>
            <br></br>
            <BlogPieChart></BlogPieChart>
        </div>
    );
}
export default BlogStatistical;