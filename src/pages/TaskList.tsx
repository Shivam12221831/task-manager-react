import { useLoaderData, useSubmit } from "react-router-dom";
import type { AllTasksType } from "../types/allTasksType";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { dataGridStyle } from "../assets/constant/dataGridStyle";
import { taskListColumns } from "../components/constants/tasksListColums";
import { useEffect, useState } from "react";
import { ConfirmModal } from "../components/ui/ConfirmModal";
import { NoTasksOverlay } from "../components/ui/NoTasksOverlay";
import { PageHeader } from "../components/ui/PageHeader";
import { getFilteredTasksFromFirebase, updateTaskStatus } from "../services/taskServices";
import { useDebounce } from "../hooks/useDebounce";
import { IoSearch } from "react-icons/io5";
import { toast } from "sonner";

const paginationModel = { page: 0, pageSize: 7 };

export const TaskList = () => {
    const loaderTasks: AllTasksType[] = useLoaderData();
    const [allTasks, setAllTasks] = useState(loaderTasks);
    const [status, setStatus] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [priority, setPriority] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [taskId, setTaskId] = useState<string | null>(null);
    const submit = useSubmit();

    const debouncedSearch = useDebounce(search, 700);

    useEffect(() => {
        setAllTasks(loaderTasks);
    }, [loaderTasks]);

    const rowsToShow = debouncedSearch.trim() ? allTasks.filter(task => task.title.toLowerCase().includes(debouncedSearch.toLowerCase())) : allTasks;

    useEffect(() => {
        if(!status && !category && !priority) {
            setAllTasks(loaderTasks);
            return;
        };
        const fetchFilteredTasks = async () => {
            try{
                setSearch("");
                const filteredTasks : AllTasksType[] = await getFilteredTasksFromFirebase({status, category, priority});
                setAllTasks(filteredTasks);
            } catch(err){
                console.log(err);
                toast.error("Unable to fetch tasks");
            }
        } 
        fetchFilteredTasks();
    }, [status, category, priority, loaderTasks]);

    function handleClearFilter(){
        setStatus("");
        setCategory("");
        setPriority("");
        setSearch("");
        setAllTasks(loaderTasks);
    }

    function handleDeleteClick(id: string){
        setTaskId(id);
        setShowConfirmModal(true);
    }

    function handleConfirmClick(){
        if (!taskId) return;
        submit(null, {method: "post", action: `/tasks/${taskId}/delete`});
        setShowConfirmModal(false);
        setTaskId(null);
    }

    function handleCancelClick(){
        setShowConfirmModal(false);
        setTaskId(null);
    }

    async function handleStatusChange(id: string, status: string){
        try{
            setAllTasks((prev) => prev.map((task) => task.id === id ? {...task, id: task.id, status: status} : task));
            await updateTaskStatus(id, status);
            toast.success("Status updated");
        } catch(err){
            console.log(err);
            toast.error("Status updation failed");
        }
    }

    return (
        <div className="py-3 sm:py-4 px-3 sm:px-4 lg:px-6">
            <div className="max-w-5xl mx-auto">
                <PageHeader title="All Tasks" subTitle="Manage and track all your tasks in one place" showButton={true}/>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-5">
                    <div className="border-b-2 border-slate-200 grid grid-cols-1 sm:grid-cols-2 md:flex justify-evenly items-center gap-3 md:gap-1 py-5 md:py-2 px-5 md:h-15">
                        <div className="flex justify-center items-center border rounded-sm border-slate-200 col-span-1 h-7">
                            <input type="text" name="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search title" className="rounded-l-sm pl-2 text-sm h-full focus:outline-red-700 w-full md:w-60"/>
                            <p className="px-1 rounded-r-sm text-sm h-7 border-l border-l-red-700 bg-red-700 text-white flex items-center"><IoSearch size={20}/></p>
                        </div>
                        <div>
                            <select name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="border border-slate-200 rounded-sm col-span-1 h-7 w-full lg:w-40 text-sm px-1">
                                <option value="" className="text-sm">Status</option>
                                <option value="pending" className="text-sm">Pending</option>
                                <option value="in-progress" className="text-sm">In-Progress</option>
                                <option value="completed" className="text-sm">Completed</option>
                            </select>
                        </div>
                        <div>
                            <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="border border-slate-200 rounded-sm col-span-1 h-7 w-full lg:w-40 text-sm px-1">
                                <option value="" className="text-sm">Category</option>
                                <option value="personal" className="text-sm">Personal</option>
                                <option value="work" className="text-sm">Work</option>
                                <option value="study" className="text-sm">Study</option>
                                <option value="health" className="text-sm">Health</option>
                                <option value="other" className="text-sm">Other</option>
                            </select>
                        </div>
                        <div>
                            <select name="priority" id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} className="border border-slate-200 rounded-sm col-span-1 h-7 w-full lg:w-40 text-sm px-1">
                                <option value="" className="text-sm">Priority</option>
                                <option value="low" className="text-sm">Low</option>
                                <option value="medium" className="text-sm">Medium</option>
                                <option value="high" className="text-sm">High</option>
                            </select>
                        </div>
                        <div className="flex justify-end sm:col-span-2 gap-3">
                            <button type="button" onClick={handleClearFilter} className="bg-red-700 hover:bg-red-900 text-white transition-all ease-in-out hover:-translate-y-0.5 rounded-md cursor-pointer text-sm py-0.5 px-3 h-6.5">
                                Clear Filter
                            </button>
                        </div>
                    </div>
                    <Paper sx={{ height: { xs: 477, sm: 477, md: 476 }, width: '100%', boxShadow: 'none',}}>
                        <DataGrid
                            // rows={allTasks}
                            rows={rowsToShow}
                            columns={taskListColumns(handleDeleteClick, handleStatusChange)}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[7]}
                            disableRowSelectionOnClick
                            sx={dataGridStyle}
                            slots={{ noRowsOverlay: NoTasksOverlay }}
                        />
                    </Paper>

                    <ConfirmModal open={showConfirmModal} onConfirm={handleConfirmClick} onCancel={handleCancelClick} />
                </div>
            </div>
        </div>
    );
};