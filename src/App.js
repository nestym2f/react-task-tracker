import Header from "./components/Header"
import Tasks from './components/Tasks'
import AddTask from "./components/AddTask"
import { useState } from "react"
function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([
      { 
        id:1,
        text: "Go to Gym",
        day:"March 24 at 8am",
        reminder:true
      },
      {
        id:2,
        text: "Go to Cristo",
        day:"March 24 at 11am",
        reminder:true
      },
      {
        id:3,
        text: "Work",
        day:"March 24 at 12pm",
        reminder:false
      }
    ])
    //Add Task
     const addTask = (task) => {
       const id = Math.floor(Math.random() * 10000) + 10000
       const newTask = {id, ...task}
       setTasks([...tasks, newTask])
     }
    //Delete Tasks from
    const deleteTask = (id) =>{
        setTasks(tasks.filter((task) => task.id !== id))
    }
    //Toggle Reminder
    const toggleReminder = (id) =>{
        setTasks(tasks.map((task) => task.id === id ? {...task, reminder : !task.reminder} : task))
    }
    return (
        <div className = "container">
          <Header/>
          {showAddTask && <AddTask onAdd = {addTask}/>}
          {
            tasks.length > 0 ? <Tasks tasks = {tasks} onDelete= {deleteTask} onToggle={toggleReminder}/> : "No Tasks to Show"
          }
          
        </div>
    );
}

export default App;