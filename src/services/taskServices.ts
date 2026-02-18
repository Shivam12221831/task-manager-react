import { db } from "../firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, Query, query, serverTimestamp, Timestamp, updateDoc, where } from "firebase/firestore";
import type { CreateTaskFormType } from "../types/createTaskFormType";
import type { AllTasksType } from "../types/allTasksType";
import type { FilteredPropsType } from "../types/filteredPropsType";

export const addTaskToFirebase = async (values : CreateTaskFormType) => {
    try{
        const formData = {...values, status: "pending", createdAt: Timestamp.now(), updatedAt: Timestamp.now()};
        return await addDoc(collection(db, "tasks"), formData);
    } catch(err){
        console.log(err);
        throw err;
    }
}

export const getAllTasksFromFirebase = async () => {
    try{
        const querySnapshot = await getDocs(query(collection(db, "tasks"), orderBy("updatedAt", "desc"), orderBy("createdAt", "desc")));
        const allTasks: AllTasksType[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data() as AllTasksType;
            const normalizedTask: AllTasksType = {
                ...data,
                id: doc.id,
                title: data.title || "-",
                description: data.description || "-",
                priority: data.priority || "-",
                dueDate: data.dueDate || "-",
                category: data.category || "-"
            };
            allTasks.push(normalizedTask);
        })
        return allTasks;
    }catch(err){
        console.log(err);
        throw err;
    }
}

export const getTaskFromFirebase = async(id: string) => {
    try{
        const querySnapshot = await getDoc(doc(collection(db, "tasks"), id));
        // console.log(querySnapshot);
        return {...querySnapshot.data(), id : querySnapshot.id};
    }catch(err){
        console.log(err);
        throw err;
    }
}

export const editTaskToFirebase = async(values: CreateTaskFormType, id: string) => {
    try{
        const newTaskData = {...values, updatedAt: serverTimestamp()};
        if(!id) throw new Error("Task Id is required");
        console.log("Task data from editTask service :", newTaskData);
        return await updateDoc(doc(db, "tasks", id), newTaskData);
        // console.log("Data successfully updated");
    }catch(err){
        console.log("Error from editTask service : ", err);
        throw err;
    }
}

export const deleteTaskFromFirebase = async(id: string) => {
    try{
        const deletedTask = await deleteDoc(doc(db, "tasks", id));
        console.log(deletedTask);
        console.log("Task deleted successfully!");
        return true;
    } catch(err){
        console.log(err);
        throw err;
    }
}

export const getFilteredTasksFromFirebase = async({status, category, priority} : FilteredPropsType) => {
    try{
        let q: Query = collection(db, "tasks");
        const conditions = [];
        if (status) conditions.push(where("status", "==", status));
        if (category) conditions.push(where("category", "==", category));
        if (priority) conditions.push(where("priority", "==", priority));
        if (conditions.length > 0) {
            q = query(q, ...conditions);
        }
        const querySnapshot = await getDocs(q);
        const filteredTasks : AllTasksType[] = [];
        querySnapshot.forEach((snapshot) => {
            const data = snapshot.data() as AllTasksType;
            const task : AllTasksType = {...data, id: snapshot.id};
            filteredTasks.push(task);
        })
        filteredTasks.sort((a, b) => {
            const aUpdated = a.updatedAt?.toMillis?.();
            const bUpdated = b.updatedAt?.toMillis?.();
            if (aUpdated && bUpdated) return bUpdated - aUpdated;
            if (aUpdated && !bUpdated) return -1;
            if (!aUpdated && bUpdated) return -1;
            const aCreated = a.createdAt?.toMillis?.() ?? 0;
            const bCreated = b.createdAt?.toMillis?.() ?? 0;
            return bCreated - aCreated;
        });
        console.log("filtered data from services: ", filteredTasks);
        return filteredTasks;
    } catch(err){
        console.log(err);
        return [];
    }
}

export const updateTaskStatus = async(id: string, status: string) => {
    const updatedTask = await updateDoc(doc(db, "tasks", id), { status: status, updatedAt : Timestamp.now()});
    console.log("update value from update Status service: ", updatedTask);
    return updatedTask;
}