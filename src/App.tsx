// import './App.css'
import { Outlet, NavLink } from 'react-router-dom';
import { GoTasklist } from "react-icons/go";
import { useState } from 'react';
import { IoMenu, IoClose } from "react-icons/io5";
import { Toaster } from "sonner";

function App() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="font-serif">
            <div className="w-full h-14 border-b border-slate-200 bg-white/80 backdrop-blur-sm mb-6">
                <div className="max-w-5xl mx-auto flex items-center justify-between px-5 lg:px-0 py-3">
                    <div className="flex items-center gap-3">
                        <GoTasklist size={20} />
                        <h1 className="text-2xl font-bold">Task Manager</h1>
                    </div>
                    <nav className="hidden md:flex gap-8">
                        <NavLink to="/" end className="nav-link">Dashboard</NavLink>
                        <NavLink to="/tasks/create" className="nav-link">Create Task</NavLink>
                        <NavLink to="/tasks" end className="nav-link">Tasks</NavLink>
                    </nav>

                    <button className="md:hidden ml-auto mr-4 cursor-pointer hover:text-slate-500"
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        {isOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
                    </button>

                    {isOpen && (
                        <div className="absolute top-14 left-0 w-full bg-slate-50 md:hidden mb-3">
                            <div className="flex flex-col justify-center items-center gap-2 py-3">
                                <NavLink to="/" onClick={() => setIsOpen(false)} end className="nav-link">Dashboard</NavLink>
                                <NavLink to="/tasks/create" onClick={() => setIsOpen(false)} className="nav-link">Create Task</NavLink>
                                <NavLink to="/tasks" onClick={() => setIsOpen(false)} end className="nav-link">Tasks</NavLink>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="text-center">
                <Outlet />
            </div>
            <Toaster position="top-right" richColors offset={{ top: 70, right: 16 }} mobileOffset={{ top: 70, right: 1 }} expand={false} toastOptions={{ duration: 2500, style: { width: "min(260px, 92vw)", padding: "10px 14px", fontSize: "13px", borderRadius: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", },}}/>
        </div>
    )
}

export default App