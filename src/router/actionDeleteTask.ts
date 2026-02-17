import { toast } from "sonner";
import { deleteTaskFromFirebase } from "../services/taskServices";
import { redirect, type LoaderFunctionArgs } from "react-router-dom";

export const actionDeleteTask = async ({params} : LoaderFunctionArgs) => {
    try{
        const deletedTask = await deleteTaskFromFirebase(params.id as string);
        console.log("From the deleteTask action : ", deletedTask);
        toast.success("Task deleted successfully");
    } catch{
        toast.error("Task deletion failed");
    }
    return redirect("/tasks");
}