import type { PageHeaderPropsType } from "../../types/ui/pageHeaderPropsType"

export const PageHeader = ({title, subTitle} : PageHeaderPropsType) => {
    return (
        <div className="mb-4 sm:mb-5 px-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 text-left mb-2">{title}</h1>
            <p className="text-xs text-slate-500 text-left">{subTitle}</p>
        </div>
    )
}