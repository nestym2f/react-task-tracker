import Header from "./components/Header"
import Tasks from './components/Tasks'
import AddTask from "./components/AddTask"
import Footer from "./components/Footer"
import About from "./components/About"
import { useState, useEffect } from "react"
import { Route, Routes, useLocation } from 'react-router-dom'
function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])
    const location = useLocation()

    useEffect(()=>{
      const getTasks = async () => {
        const tasksFromServer = await fetchTasks()
        setTasks(tasksFromServer)
      }
      
      getTasks()
    }, [])

    //Fet Tasks
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json()
      return data
    }
    //Fet Task
    const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()
      return data
    }
    //Add Task
     const addTask = async (task) => {
       const res = await fetch('http://localhost:5000/tasks',
        {method: "POST",
         headers: {'Content-type': 'application/json'},
         body: JSON.stringify(task)
        })

        const data = await res.json()
        setTasks([...tasks, data])
/*        const id = Math.floor(Math.random() * 10000) + 10000
       const newTask = {id, ...task}
       setTasks([...tasks, newTask]) */
     }
    //Delete Tasks from
    const deleteTask = async (id) =>{
        await fetch(`http://localhost:5000/tasks/${id}`, {method: "DELETE"})
        setTasks(tasks.filter((task) => task.id !== id))
    }
    //Update Tasks from
      const updateTask = async (task) =>{
        const res = await fetch(`http://localhost:5000/tasks/${task.id}`,
        {method: "PATCH",
         headers: {"content-type": "application/json"},
         body: JSON.stringify(task)
        })

        const data = await res.json()
        const updatedTask = tasks.filter((toUpdateTask) => toUpdateTask.id === data.id)
        setTasks([...task])
    }
    //Toggle Reminder
    const toggleReminder = async (id) =>{ 
        const taskToToggle = await fetchTask(id)
        const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}

        const res = await fetch(`http://localhost:5000/tasks/${id}`,
        {method: "PUT",
         headers: {"content-type": "application/json"},
         body: JSON.stringify(updateTask)
        })

        const data = await res.json()

        setTasks(tasks.map((task) => task.id === id ? {...task, reminder : data.reminder} : task))    
    }
    return (       
        <div className = "container">          
          <Header onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
          
          {showAddTask && <AddTask onAdd={addTask} />}

          {
            tasks.length > 0 && location.pathname === "/" ? <Tasks tasks = {tasks} onDelete= {deleteTask} onToggle={toggleReminder}/> : (location.pathname === "/" ? "No Tasks to Show": "")
          }          
            <Routes>
              <Route path="about" element={<About/>}/> 
            </Routes>                
          <Footer/>
        </div>                        
    )
}

export default App;