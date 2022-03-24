import Header from "./components/Header"
import Tasks from './components/Tasks'
import { useState } from "react"
function App() {
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
          {
            tasks.length > 0 ? <Tasks tasks = {tasks} onDelete= {deleteTask} onToggle={toggleReminder}/> : "No Tasks to Show"
          }
          
        </div>
    );
}

export default App;