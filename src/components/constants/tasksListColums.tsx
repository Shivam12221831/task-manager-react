import type { GridColDef } from '@mui/x-data-grid';
import { NavLink } from 'react-router-dom';

export const taskListColumns = (handleDeleteClick:(id: string) => void, handleStatusChange:(id: string, status: string) => void): GridColDef[] => [
    {
        field: 'serial',
        headerName: '#',
        width: 20,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        align: 'center',
        headerAlign: 'center',
        headerClassName: 'divider-col no-divider-header',
        cellClassName: 'divider-col',
        renderCell: (params) => {
            const page = params.api.state.pagination.paginationModel.page;
            const pageSize = params.api.state.pagination.paginationModel.pageSize;
            const rowIndex = params.api.getRowIndexRelativeToVisibleRows(params.id);
            return page * pageSize + rowIndex + 1;
        }
    },
    { 
        field: 'title', 
        headerName: 'Task Title',
        flex: 1,
        minWidth: 150,
        cellClassName: 'title-cell-padding',
        headerClassName: 'title-cell-padding',
        sortable: false,
        disableColumnMenu: true,
    },
    { 
        field: 'priority', 
        headerName: 'Priority',
        width: 120,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        disableColumnMenu: true,
    },
    { 
        field: 'category', 
        headerName: 'Category',
        width: 130,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        disableColumnMenu: true,
    },
    { 
        field: 'status', 
        headerName: 'Status',
        width: 120,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        disableColumnMenu: true,
        renderCell:  (params) => (
            <div>
                <select
                    name="status"
                    value={params.row.status}
                    onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
                    className={`text-xs font-medium rounded-md px-2 py-1 cursor-pointer border outline-none focus:ring-1 transition-all
                        ${ params.row.status === "completed"
                            ? "bg-green-100 text-green-800 border-green-200 focus:ring-green-200"
                            : params.row.status === "in-progress"
                            ? "bg-blue-50 text-blue-700 border-blue-200 focus:ring-blue-200"
                            : "bg-amber-100 text-amber-700 border-amber-200 focus:ring-amber-200"
                        }
                    `}
                >
                    <option value="pending" className='text-black bg-white'>Pending</option>
                    <option value="in-progress" className='text-black bg-white'>In-Progress</option>
                    <option value="completed" className='text-black bg-white'>Completed</option>
                </select>

            </div>
        )
    },
    { 
        field: 'action', 
        headerName: 'Action',
        width: 180,
        sortable: false,
        disableColumnMenu: true,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'no-divider-header',
        renderCell: (params) => (
            <div className="flex justify-center items-center">
                <NavLink to={`/tasks/${params.row.id}`} className="px-1 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-sm transition cursor-pointer">View</NavLink>
                <div>|</div>
                <NavLink to={`/tasks/${params.row.id}/edit`} className="px-1 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-sm transition cursor-pointer">Edit</NavLink>
                <div>|</div>
                <button onClick={() => handleDeleteClick(params.row.id)} className="px-1 py-1 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-100 rounded-sm transition cursor-pointer"> Delete</button>
            </div>
        )
    },
];