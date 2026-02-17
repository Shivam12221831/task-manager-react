export const dataGridStyle = {
    border: 0,

    '& .MuiDataGrid-cell': {},

    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: '#f8fafc',
        borderBottom: '2px solid #e2e8f0',
        fontSize: { xs: '0.75rem', sm: '0.875rem' },
        fontWeight: 600,
    },

    "& .no-divider-header .MuiDataGrid-columnSeparator": {
        display: "none",
    },

    '& .MuiDataGrid-row:hover': {
        backgroundColor: '#f8fafc',
    },

    '& .MuiDataGrid-footerContainer': {
        borderTop: '2px solid #e2e8f0',
        backgroundColor: '#f8fafc',
    },

    '& .MuiCheckbox-root': {
        color: '#64748b',
    },

    '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
        outline: 'none !important',
    },

    '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
        outline: 'none !important',
    },

    '& .MuiDataGrid-row.Mui-selected': {
        backgroundColor: '#eff6ff',
        '&:hover': {
            backgroundColor: '#dbeafe',
        },
    },

    fontSize: { xs: '0.75rem', sm: '0.875rem' },
}