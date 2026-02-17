import type { AllTasksType } from "../../types/allTasksType";
import type { DashboardBoxPropsType } from "../../types/ui/dashboardBoxTypes";
import { PieChart } from "./PieChart";
import { NavLink } from "react-router-dom";
import { LuNotepadText } from "react-icons/lu";
import { IoPieChartSharp } from "react-icons/io5";

export const DashboardBox = ({ title, value, type }: DashboardBoxPropsType) => {

    return (
        <div className="dash-box h-full sm:h-80 flex flex-col">
            <div className="">
                <h3 className="dash-box-label">{title}</h3>
            </div>
            {type === "insights" ? (
                <div className="flex-1 flex flex-col">
                    {Object.keys(value.statusObj).length === 0 || Object.keys(value.priorityObj).length === 0 ? (
                        <div className="flex items-center justify-center flex-1">
                            <div className="text-center flex justify-center items-center gap-2">
                                <IoPieChartSharp size={20} className="text-slate-500"/>
                                <p className="text-md text-slate-500">No charts to show</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 items-center px-2">
                            <div className="w-full h-full flex items-center justify-center overflow-hidden">
                                <PieChart chartObj={value.statusObj} chartTitle="status" />
                            </div>
                            <div className="w-full h-full flex items-center justify-center overflow-hidden">
                                <PieChart chartObj={value.priorityObj} chartTitle="priority" />
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex-1 flex flex-col">
                    {value.length === 0 ? (
                        <div className="flex items-center justify-center flex-1">
                            <div className="text-center flex justify-center items-center gap-2">
                                <LuNotepadText size={20} className="text-slate-500"/>
                                <p className="text-md text-slate-500">No recent tasks</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col justify-center divide-y divide-slate-200">
                            {value.slice(0, 5).map((task: AllTasksType, index: number) => (
                                <div key={task.id} className="group flex items-center justify-between py-3 px-3 hover:bg-slate-50 hover:shadow-sm hover:border-l-slate-900 rounded transition-all duration-200 cursor-pointer">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <span className="text-sm font-medium text-slate-700 shrink-0 group-hover:text-slate-900 transition-colors">{index + 1}</span>
                                        <span className="text-sm text-slate-700 truncate group-hover:text-slate-900 group-hover:font-medium transition-all">{task.title}</span>
                                    </div>
                                    <NavLink to={`/tasks/${task.id}`} className="shrink-0 ml-3 px-3 py-1.5 text-xs font-medium text-slate-600 border border-slate-200 rounded-md group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-200 cursor-pointer">View</NavLink>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};