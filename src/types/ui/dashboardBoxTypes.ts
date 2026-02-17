// import type { AllTasksType } from "./allTasksType";

import type { AllTasksType } from "../allTasksType";


export type StatusObjType = {
    completed: number,
    pending: number,
    inProgress: number
}

export type PriorityObjType = {
    lowCount: number,
    mediumCount: number,
    highCount: number,
}

export type PieChartPropsType = {
    chartTitle: "status",
    chartObj: StatusObjType
} | {
    chartTitle: "priority",
    chartObj: PriorityObjType
};

export type DashboardBoxPropsType ={
    type: "insights";
    title: string;
    value: {
      statusObj: StatusObjType;
      priorityObj: PriorityObjType;
    };
} | {
    type: "recent_tasks";
    title: string;
    value: AllTasksType[];
};