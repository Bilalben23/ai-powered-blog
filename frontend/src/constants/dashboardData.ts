import { blogData } from "./blogData";

export const dashboardData = {
    "blogs": 10,
    "comments": 5,
    "drafts": 0,
    "recentBlogs": blogData.slice(0, 5),
}