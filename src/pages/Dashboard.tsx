import { useLoaderData } from "react-router-dom";
import type { AllTasksType } from "../types/allTasksType";
import { DashboardCard } from "../components/ui/DashboardCard";
import { DashboardBox } from "../components/ui/DashboardBox";
import { PageHeader } from "../components/ui/PageHeader";

export const Dashboard = () => {
    const allTasks = useLoaderData() as AllTasksType[];

    const completed = allTasks.filter(t => t.status === "completed").length;
    const inProgress = allTasks.filter(t => t.status === "in-progress").length;
    const pending = allTasks.filter(t => t.status === "pending").length;
    const statusObj = {
        completed: completed,
        inProgress: inProgress,
        pending: pending
    }

    const lowCount = allTasks.filter(t => t.priority === "low").length;
    const mediumCount = allTasks.filter(t => t.priority === "medium").length;
    const highCount = allTasks.filter(t => t.priority === "high").length;
    const priorityObj = {
        lowCount: lowCount,
        mediumCount: mediumCount,
        highCount: highCount
    }

    return (
        <div className="py-6 px-4">
            <div className="max-w-5xl mx-auto">
                <PageHeader title="Dashboard" subTitle="Welcome back — let’s pretend we have everything under control" />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 mb-6">
                    <DashboardCard title="Total Tasks" value={allTasks.length}/>
                    <DashboardCard title="Completed" value={completed}/>
                    <DashboardCard title="In-progress" value={inProgress}/>
                    <DashboardCard title="Pending" value={pending}/>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <DashboardBox title="Task Insights" value={{statusObj, priorityObj}} type="insights" />
                    <DashboardBox title="Recent Tasks" value={allTasks} type="recent_tasks" />
                </div>
            </div>
        </div>
    );
};