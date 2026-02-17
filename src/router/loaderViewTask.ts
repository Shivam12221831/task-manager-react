import { getTaskFromFirebase } from "../services/taskServices";
import type { LoaderFunctionArgs } from "react-router-dom";

export const loaderViewTask = async({params} : LoaderFunctionArgs) => {
    const id = params.id;
    if(!id) throw new Error("Task id missing");
    const task = await getTaskFromFirebase(params.id as string);
    // console.log("task from view loader : ", snapShot);
    return task;
}