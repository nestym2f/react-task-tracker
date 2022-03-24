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
    return (
        <div className = "container">
          <Header/>
          <Tasks tasks = {tasks}/>
        </div>
    );
}

export default App;