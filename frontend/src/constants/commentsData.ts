import { blogData, type Blog } from "./blogData";

export interface Comment {
    _id: string;
    blog: Blog;
    name: string;
    content: string;
    isApproved: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export const commentsData: Comment[] = [
    // Blog 0
    {
        _id: "6811ed9e7836a82ba747cb25",
        blog: blogData[0],
        name: "Michael Scott",
        content: "This is my new comment",
        isApproved: false,
        createdAt: "2025-04-30T09:30:06.918Z",
        updatedAt: "2025-04-30T09:30:06.918Z",
        __v: 0,
    },
    {
        _id: "6811ed9e7836a82ba747cb26",
        blog: blogData[0],
        name: "Pam Beesly",
        content: "Loved the insights shared here.",
        isApproved: true,
        createdAt: "2025-04-30T10:12:00.000Z",
        updatedAt: "2025-04-30T10:12:00.000Z",
        __v: 0,
    },
    {
        _id: "6811ed9e7836a82ba747cb27",
        blog: blogData[0],
        name: "Dwight Schrute",
        content: "Needs more facts about bears and beets.",
        isApproved: false,
        createdAt: "2025-04-30T11:00:00.000Z",
        updatedAt: "2025-04-30T11:00:00.000Z",
        __v: 0,
    },

    // Blog 1
    {
        _id: "6810a752fbb942aa7cbf4adb",
        blog: blogData[1],
        name: "John Doe",
        content: "This is a nice blog",
        isApproved: false,
        createdAt: "2025-04-29T10:17:54.832Z",
        updatedAt: "2025-04-29T10:17:54.832Z",
        __v: 0,
    },
    {
        _id: "6810a752fbb942aa7cbf4adc",
        blog: blogData[1],
        name: "Jane Doe",
        content: "Very informative and well-written.",
        isApproved: true,
        createdAt: "2025-04-29T11:00:00.000Z",
        updatedAt: "2025-04-29T11:00:00.000Z",
        __v: 0,
    },
    {
        _id: "6810a752fbb942aa7cbf4add",
        blog: blogData[1],
        name: "Emily Clark",
        content: "I learned a lot from this article.",
        isApproved: true,
        createdAt: "2025-04-29T12:30:00.000Z",
        updatedAt: "2025-04-29T12:30:00.000Z",
        __v: 0,
    },

    // Blog 2
    {
        _id: "680779aebef75c08f8b4898f",
        blog: blogData[2],
        name: "Jack London",
        content: "Hi this blog is must to read",
        isApproved: true,
        createdAt: "2025-04-22T11:12:46.547Z",
        updatedAt: "2025-04-22T11:13:10.015Z",
        __v: 0,
    },
    {
        _id: "680779aebef75c08f8b48990",
        blog: blogData[2],
        name: "Sophia Bright",
        content: "Excellent explanation of the topic.",
        isApproved: true,
        createdAt: "2025-04-22T12:00:00.000Z",
        updatedAt: "2025-04-22T12:00:00.000Z",
        __v: 0,
    },
    {
        _id: "680779aebef75c08f8b48991",
        blog: blogData[2],
        name: "Leo King",
        content: "Could use more visuals, but the content is solid.",
        isApproved: false,
        createdAt: "2025-04-22T13:15:00.000Z",
        updatedAt: "2025-04-22T13:15:00.000Z",
        __v: 0,
    },

    // Blog 3
    {
        _id: "680770aeb2897e5c28bf9b26",
        blog: blogData[3],
        name: "Sam Smith",
        content: "This is the best blog, everybody should read it",
        isApproved: false,
        createdAt: "2025-04-22T10:34:22.020Z",
        updatedAt: "2025-04-22T10:34:22.020Z",
        __v: 0,
    },
    {
        _id: "680770aeb2897e5c28bf9b27",
        blog: blogData[3],
        name: "Lucy Lane",
        content: "Clear, concise, and very helpful.",
        isApproved: true,
        createdAt: "2025-04-22T10:40:00.000Z",
        updatedAt: "2025-04-22T10:40:00.000Z",
        __v: 0,
    },
    {
        _id: "680770aeb2897e5c28bf9b28",
        blog: blogData[3],
        name: "Mark Twain",
        content: "An engaging read, loved the tone!",
        isApproved: true,
        createdAt: "2025-04-22T11:00:00.000Z",
        updatedAt: "2025-04-22T11:00:00.000Z",
        __v: 0,
    },

    // Blog 4
    {
        _id: "68076468e32055c94a696cf5",
        blog: blogData[4],
        name: "Peter Lawrence",
        content: "Honestly, I did not expect this to work, but it totally did. Saved my project!",
        isApproved: true,
        createdAt: "2025-04-22T09:42:00.444Z",
        updatedAt: "2025-04-22T10:24:55.626Z",
        __v: 0,
    },
    {
        _id: "68076468e32055c94a696cf6",
        blog: blogData[4],
        name: "Anna Lee",
        content: "Perfectly structured and full of value.",
        isApproved: true,
        createdAt: "2025-04-22T09:50:00.000Z",
        updatedAt: "2025-04-22T09:50:00.000Z",
        __v: 0,
    },
    {
        _id: "68076468e32055c94a696cf7",
        blog: blogData[4],
        name: "Tony Stark",
        content: "Great use of practical examples.",
        isApproved: false,
        createdAt: "2025-04-22T10:10:00.000Z",
        updatedAt: "2025-04-22T10:10:00.000Z",
        __v: 0,
    },
];
