import { NavLink, useLoaderData, useSubmit } from "react-router-dom";
import type { AllTasksType } from "../types/allTasksType";
import { useState } from "react";
import { ConfirmModal } from "../components/ui/ConfirmModal";
import { formatDate, formatDateTime } from "../utils/tasks/format";
import { statusStyles } from "../assets/styles/viewStyles";
import { TaskViewCard } from "../components/ui/TaskViewCard";
import { PageHeader } from "../components/ui/PageHeader";

export const ViewTask = () => {
    const task: AllTasksType = useLoaderData();
    console.log("task from view task : ", task);
    const submit = useSubmit();
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleDelete = () => {
        console.log("Deleting task:", task.id);
        submit(null, {method: "post", action: `/tasks/${task.id}/delete`});
        setShowConfirmModal(false);
    };

    return (
        <div className="py-4 px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="max-w-xl mx-auto w-full">
                <PageHeader title="Task Details" subTitle="View complete information about your task" showButton={false} />

                <div className="bg-white rounded-xl shadow-md border border-slate-200 mt-5">
                    <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                            <h2 className="text-md text-left font-semibold text-slate-900 flex-1">{task.title}</h2>
                            <div className={`self-start sm:self-auto px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusStyles[task.status as keyof typeof statusStyles] || statusStyles.pending}`}>
                                {task.status}
                            </div>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 mb-2">Description</h3>
                            <p className="text-sm text-slate-700 leading-relaxed bg-slate-100 rounded-lg min-h-15 text-justify flex justify-center items-center px-4 sm:px-5 py-3">
                                {task.description || "No description provided"}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 mb-3 sm:mb-4">Task Snapshot</h3>
                            <div className="grid grid-cols-2 gap-3 text-left pl-3 sm:pl-5 md:pl-7">
                                <TaskViewCard title="Priority" value={task.priority} />
                                <TaskViewCard title="Due Date" value={task.dueDate ? formatDate(task.dueDate) : "N/A"} />
                                <TaskViewCard title="Category" value={task.category} />
                                <TaskViewCard title="Created at" value={formatDateTime(task.createdAt)} />
                                <TaskViewCard title="Status" value={task.status} />
                                <TaskViewCard title="Last Updated" value={task.updatedAt && task.updatedAt.toMillis() !== task.createdAt.toMillis() ? formatDateTime(task.updatedAt) : "N/A"} />
                            </div>
                        </div>
                    </div>

                    <div className="px-4 sm:px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-row justify-end gap-3">
                        <NavLink to={`/tasks/${task.id}/edit`} className="w-auto px-5 py-1.5 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors">Edit</NavLink>
                        <button onClick={() => setShowConfirmModal(true)} className="w-auto px-5 py-1.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors cursor-pointer">Delete</button>
                    </div>
                </div>
            </div>

            <ConfirmModal
                open={showConfirmModal}
                onConfirm={handleDelete}
                onCancel={() => setShowConfirmModal(false)}
            />
        </div>
    );
};