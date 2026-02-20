import { NavLink } from "react-router-dom"
import type { PageHeaderPropsType } from "../../types/ui/pageHeaderPropsType"

export const PageHeader = ({ title, subTitle, showButton }: PageHeaderPropsType) => {
    return (
        <div className="flex items-center justify-between w-full gap-4 px-4">
            <div className="flex flex-col items-start">
                <h1 className="text-2xl font-bold">{title}</h1>
                {subTitle && (
                <p className="text-xs sm:text-sm text-gray-500 mt-1 text-left">{subTitle}</p>
                )}
            </div>
            {showButton && (<NavLink to={'/tasks/create'} className="shrink-0 px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg text-sm font-medium transition-all ease-in-out hover:-translate-y-0.5">Add Task</NavLink>)}
        </div>
    )
}