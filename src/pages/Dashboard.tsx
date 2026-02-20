import { useLoaderData } from "react-router-dom";
import type { AllTasksType } from "../types/allTasksType";
import { DashboardCard } from "../components/ui/DashboardCard";
import { DashboardBox } from "../components/ui/DashboardBox";
import { PageHeader } from "../components/ui/PageHeader";

export const Dashboard = () => {
    const allTasks = useLoaderData() as AllTasksType[];

    const statusObj = {
        completed: 0,
        inProgress: 0,
        pending: 0,
    };

    const priorityObj = {
        lowCount: 0,
        mediumCount: 0,
        highCount: 0,
    };

    for (const task of allTasks) {
        if (task.status === "completed") statusObj.completed++;
        if (task.status === "in-progress") statusObj.inProgress++;
        if (task.status === "pending") statusObj.pending++;

        if (task.priority === "low") priorityObj.lowCount++;
        if (task.priority === "medium") priorityObj.mediumCount++;
        if (task.priority === "high") priorityObj.highCount++;
    }

    return (
        <div className="py-6 px-4">
            <div className="max-w-5xl mx-auto">
                <PageHeader title="Dashboard" subTitle="Welcome back — chaos managed, vibes immaculate" showButton={true} />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 my-6">
                    <DashboardCard title="Total Tasks" value={allTasks.length}/>
                    <DashboardCard title="Completed" value={statusObj.completed}/>
                    <DashboardCard title="In-progress" value={statusObj.inProgress}/>
                    <DashboardCard title="Pending" value={statusObj.pending}/>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <DashboardBox title="Task Insights" value={{statusObj, priorityObj}} type="insights" />
                    <DashboardBox title="Recent Tasks" value={allTasks} type="recent_tasks" />
                </div>
            </div>
        </div>
    );
};