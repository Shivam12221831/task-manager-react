export const NoTasksOverlay = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-md font-medium">No tasks found</p>
            {/* <p className="text-xs mt-1">Create your first task to get started</p> */}
        </div>
    );
};