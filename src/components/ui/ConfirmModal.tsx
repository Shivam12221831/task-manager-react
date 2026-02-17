import type { ConfirmModalPropsType } from "../../types/ui/confirmModalPropsType";

export const ConfirmModal = ({ open, onConfirm, onCancel }: ConfirmModalPropsType) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
            <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg">
                <div className="p-6 pb-0">
                    <h2 className="text-lg font-semibold text-slate-800 mb-2">Delete Task</h2>
                    <p className="text-sm text-slate-600 mb-6">Are you sure you want to delete this task?</p>
                </div>
                <div className="bg-slate-50 rounded-lg">
                    <div className="flex justify-end gap-3 py-2 px-5">
                        <button onClick={onCancel} className="px-4 py-2 text-sm rounded-lg border cursor-pointer text-slate-600 hover:bg-slate-200" >Cancel</button>
                        <button onClick={onConfirm} className="px-4 py-2 text-sm rounded-lg cursor-pointer bg-red-600 text-white hover:bg-red-700" >Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};