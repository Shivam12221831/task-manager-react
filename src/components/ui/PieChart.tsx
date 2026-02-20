import { Chart } from "react-google-charts";
import type { PieChartPropsType } from "../../types/ui/dashboardBoxTypes";

type PieChartInstance = {
  setSelection: (selection: unknown[]) => void;
};

export const PieChart = ({ chartObj, chartTitle }: PieChartPropsType) => {
    const data = chartTitle==="status" ? [
        ["Status", "Tasks"],
        ["Completed", chartObj.completed],
        ["Pending", chartObj.pending],
        ["In Progress", chartObj.inProgress],
    ] : [
        ["Status", "Tasks"],
        ["Low", chartObj.lowCount],
        ["Medium", chartObj.mediumCount],
        ["High", chartObj.highCount],
    ];

    const options = {
        // pieHole: 0.45,
        backgroundColor: "transparent",
        colors: chartTitle==="status" ? [ "#22C55E", "#F59E0B", "#3B82F6" ] : ["#F59E0B", "#6366F1", "#e43934"],
        legend: {
            position: "bottom",
            alignment: "center",
            textStyle: {
                fontSize: 8,
                color: "#475569",
            },
        },
        // enableInteractivity: false,
        chartArea: { width: "92%", height: "75%", top: 10, },
        tooltip: {
            trigger: "focus",
            textStyle: {
                fontSize: 10,
            },
            showColorCode: true
        },
    };


    return (
        <div className="w-full">
            <h3 className="text-center text-xs text-slate-800 mt-1">
                {chartTitle === "status" ? "Status" : "Priority"}
            </h3>
            <Chart
                chartType="PieChart"
                width="100%"
                height="260px"
                data={data}
                options={options}
                chartEvents={[{
                    eventName: "select",
                    callback: ({ chartWrapper }) => {
                        const rawChart = chartWrapper?.getChart();
                        if (!rawChart) return;
                        const chart = rawChart as unknown as PieChartInstance;
                        chart.setSelection([]);
                    }
            }]}
            />
        </div>
    );
};