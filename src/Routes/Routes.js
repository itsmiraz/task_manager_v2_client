import AddTask from "../Pages/AddTask/AddTask";
import Completed from "../Pages/Completed/Completed";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../Layout/Main");
const { default: MyTask } = require("../Pages/MyTask/MyTask");

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element:<MyTask></MyTask>
            },
            {
                path: '/addtask',
                element: <AddTask></AddTask>,
                
            },
            {
                path: '/completed',
                element:<Completed></Completed>
            }
        ]
        
    }
])