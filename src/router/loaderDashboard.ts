import { getAllTasksFromFirebase } from "../services/taskServices";

export const loaderDashboard = async() => {
    const allTasks = await getAllTasksFromFirebase();
    console.log("All tasks from dashboard loader :", allTasks);
    return allTasks;
}