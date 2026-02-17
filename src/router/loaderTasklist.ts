import { getAllTasksFromFirebase } from "../services/taskServices";

export const loaderTasklist = async() => {
    const allTasks = await getAllTasksFromFirebase();
    console.log("All tasks from tasklist loader :", allTasks);
    return allTasks;
}