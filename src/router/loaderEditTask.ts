import type { LoaderFunctionArgs } from "react-router-dom";
import { getTaskFromFirebase } from "../services/taskServices";

export const loaderEditTask = async({params} : LoaderFunctionArgs) => {
    const id = params.id;
    if(!id) throw new Error("Task id missing");
    const task = await getTaskFromFirebase(params.id as string);
    // console.log("task from edit loader : ", snapShot);
    return task;
}