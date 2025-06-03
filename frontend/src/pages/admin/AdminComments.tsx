import { commentsData } from '@constants/commentsData'
import { formatDateReadable } from '@utils/formatDate';
import { CheckCircle, Trash2, XCircle } from "lucide-react";
import { useState } from 'react';
import { motion } from 'motion/react';


export default function AdminComments() {
    const [isApproved, setIsApproved] = useState(true);

    const handleApprovedComment = (id: string) => {
        // TODO: Send PATCH request to backend to approve or disapprove the comment
        console.log(`✅ Toggling approval status for comment with ID: ${id}`);
    }

    const handleDeleteComment = (id: string) => {
        // TODO: Send DELETE request to backend to permanently remove the comment
        console.log(`🗑️ Deleting comment with ID: ${id}`);
    }

    return (
        <section className='flex-1 w-full p-3 sm:p-6 md:p-10'>
            <div className='flex items-center justify-between w-full md:max-w-5xl'>
                <h1 className='font-medium text-gray-600'>Comments</h1>

                <div className="flex items-center gap-3 mt-4">
                    <button
                        type="button"
                        onClick={() => setIsApproved(true)}
                        className={`flex items-center gap-2 cursor-pointer px-4 py-1.5 text-xs border rounded-full shadow transition-all duration-200 ${isApproved
                            ? "bg-primary/10 text-primary border-primary"
                            : "text-gray-600 bg-white border-gray-300"
                            }`}
                    >
                        <CheckCircle className="size-4" />
                        Approved
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsApproved(false)}
                        className={`flex items-center gap-2 px-4 py-1.5 text-xs border rounded-full shadow transition-all cursor-pointer duration-200 ${isApproved
                            ? "text-gray-600 bg-white border-gray-300"
                            : "bg-red-100 text-red-600 border-red-400"

                            }`}
                    >
                        <XCircle className="size-4" />
                        Not Approved
                    </button>
                </div>
            </div>

            <div className="relative max-w-full mt-5 overflow-x-auto bg-white rounded-lg shadow md:max-w-5xl">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th scope="col" className="p-4 font-medium">
                                BLOG TITLE & COMMENT
                            </th>

                            <th scope="col" className="p-4 font-medium max-sm:hidden">
                                DATE
                            </th>
                            <th scope="col" className="p-4 font-medium text-end">
                                ACTIONS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            commentsData.map(comment => (
                                <tr
                                    key={comment._id}
                                    className="font-light border-b border-gray-200 last:*:pb-12"
                                >
                                    <td className="p-4">
                                        <p className='mb-4 text-gray-700 line-clamp-2'>
                                            <span className='font-medium'>Blog: </span>
                                            {comment.blog.title}
                                        </p>
                                        <p className='text-gray-700'>
                                            <span className='font-medium'>Name: </span>
                                            Michael Scott
                                        </p>
                                        <p className='text-gray-700'>
                                            <span className='font-medium'>Comment:</span>
                                            {comment.content}
                                        </p>
                                    </td>
                                    <td className='p-4 text-gray-700'>
                                        {formatDateReadable(comment.createdAt)}
                                    </td>
                                    <td className='p-4'>
                                        <div className='flex items-center justify-end gap-x-2'>
                                            {
                                                comment.isApproved
                                                    ? <motion.button
                                                        type="button"
                                                        onClick={() => handleApprovedComment(comment._id)}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="p-1 rounded-full cursor-pointer"
                                                    >
                                                        <motion.div
                                                            initial={{ stroke: "#22c55e" }}
                                                            whileTap={{ stroke: "#16a34a" }}
                                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                                            style={{ display: "inline-block" }}
                                                        >
                                                            <CheckCircle size={24} />
                                                        </motion.div>
                                                    </motion.button>
                                                    : <p className='px-3 py-1 text-xs text-green-600 bg-green-100 border border-green-600 rounded-full'>Approved</p>
                                            }
                                            <motion.button
                                                type="button"
                                                onClick={() => handleDeleteComment(comment._id)}
                                                whileHover={{ scale: 1.1, rotate: -5 }}
                                                whileTap={{ scale: 0.95 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                                className="p-1 rounded-full cursor-pointer"
                                            >
                                                <motion.div
                                                    initial={{ color: "#4B5563" }}
                                                    whileHover={{ color: "#EF4444" }}
                                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                                    style={{ display: "inline-block" }}
                                                >
                                                    <Trash2 className="size-6" />
                                                </motion.div>
                                            </motion.button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div >
        </section >
    )
}
