import { useRef, useState } from "react"

import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import StudyForm from "./components/StudyForm"
import StudyPlan from "./components/StudyPlan"
import WeeklyPlanner from "./components/WeeklyPlanner"
import PomodoroTimer from "./components/PomoDoroTImer"
import Chatbot from "./components/Chatbot"

function App(){

  const [subjects,setSubjects] = useState([])
  const [plan,setPlan] = useState([])

  const dashboardRef = useRef(null)
  const studyRef = useRef(null)
  const weeklyRef = useRef(null)
  const pomodoroRef = useRef(null)
  const aiRef = useRef(null)

  const scrollToSection = (ref)=>{

    if(!ref.current) return

    ref.current.scrollIntoView({
      behavior:"smooth",
      block:"center"
    })

    ref.current.classList.add("card-highlight")

    setTimeout(()=>{
      ref.current.classList.remove("card-highlight")
    },1000)
  }

  return(

    <div className="dashboard">

      <Sidebar
        scrollToSection={scrollToSection}
        dashboardRef={dashboardRef}
        studyRef={studyRef}
        weeklyRef={weeklyRef}
        pomodoroRef={pomodoroRef}
        aiRef={aiRef}
      />

      <div className="main">

        <Navbar/>

        <div className="content">

          <div ref={dashboardRef} className="card">
            <StudyForm
              subjects={subjects}
              setSubjects={setSubjects}
              setPlan={setPlan}
            />
          </div>

          <div ref={studyRef} className="card">
            <StudyPlan plan={plan}/>
          </div>

          <div ref={weeklyRef} className="card">
            <WeeklyPlanner plan={plan}/>
          </div>

          <div ref={pomodoroRef} className="card">
            <PomodoroTimer/>
          </div>

          <div ref={aiRef} className="card">
            <Chatbot/>
          </div>

        </div>

      </div>

    </div>
  )
}

export default App