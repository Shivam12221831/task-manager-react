import type { TaskViewCardPropsType } from "../../types/ui/taskViewCardPropsType"

export const TaskViewCard = ({title, value} : TaskViewCardPropsType) => {
  return (
    <div className="flex items-center flex-col sm:flex-row">
        <div className="text-sm text-slate-600 pb-1 sm:pb-0 sm:w-32">{title}</div>
        <div className="text-sm text-slate-900 font-medium">
            {value}
        </div>
    </div>
  )
}