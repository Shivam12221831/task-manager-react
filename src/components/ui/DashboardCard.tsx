import type { DashboardCardPropsType } from "../../types/ui/dashboardCardPropsType"

export const DashboardCard = ({title, value} : DashboardCardPropsType) => {
    return(
        <div className="dash-box">
            <p className="dash-box-label">{title} </p>
            <p className="dash-box-value text-slate-800">{value}</p>
        </div>
    )
}