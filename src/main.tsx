import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard.tsx';
import { CreateTask } from './pages/CreateTask.tsx';
import { TaskList } from './pages/TaskList.tsx';
import { EditTask } from './pages/EditTask.tsx';
import { ViewTask } from './pages/ViewTask.tsx';
import { loaderDashboard } from './router/loaderDashboard.ts';
import { loaderTasklist } from './router/loaderTasklist.ts';
import { actionDeleteTask } from './router/actionDeleteTask.ts';
import { loaderViewTask } from './router/loaderViewTask.ts';
import { loaderEditTask } from './router/loaderEditTask.ts';
import { HydrateFallbackElement } from './components/ui/HydrateFallbackElement.tsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        hydrateFallbackElement: <HydrateFallbackElement />,
        children: [
            {
                // path: "dashboard",
                index: true,
                element: <Dashboard />,
                loader: loaderDashboard
            },
            {
                path: "tasks",
                element: <TaskList />,
                loader: loaderTasklist
            },
            {
                path: "tasks/create",
                element: <CreateTask />,
            },
            {
                path: "tasks/:id",
                element: <ViewTask />,
                loader: loaderViewTask
            },
            {
                path: "tasks/:id/edit",
                element: <EditTask />,
                loader: loaderEditTask
            },
            {
                path: "tasks/:id/delete",
                action: actionDeleteTask
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)