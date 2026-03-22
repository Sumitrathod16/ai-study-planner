import { useState, useRef, useEffect } from "react"

import Auth from "./components/Auth"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import StudyForm from "./components/StudyForm"
import StudyPlan from "./components/StudyPlan"
import WeeklyPlanner from "./components/WeeklyPlanner"
import PomodoroTimer from "./components/PomodoroTimer"
import Chatbot from "./components/Chatbot"

import AiDoubtSolver from "./components/AiDoubtSolver"
import AiQuiz from "./components/AiQuiz"
import AiSummarizer from "./components/AiSummarizer"
import Analytics from "./components/Analytics"
import ExamCountdown from "./components/ExamCountdown"

function App(){

  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)

  const [subjects,setSubjects] = useState([])
  const [plan,setPlan] = useState([])

  const dataFetched = useRef(false)

  useEffect(() => {
    if (token) {
      fetch('http://localhost:5000/api/data', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.subjects && data.subjects.length > 0) setSubjects(data.subjects)
        if (data.plan && data.plan.length > 0) setPlan(data.plan)
        
        // Timeout to allow initial states to settle without immediately triggering the save useEffect
        setTimeout(() => { dataFetched.current = true }, 500)
      })
      .catch(console.error)
    }
  }, [token])

  useEffect(() => {
    if (token && dataFetched.current) {
      fetch('http://localhost:5000/api/data', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjects, plan })
      }).catch(console.error)
    }
  }, [subjects, plan, token])

  const dashboardRef = useRef(null)
  const studyRef = useRef(null)
  const weeklyRef = useRef(null)
  const pomodoroRef = useRef(null)
  const aiRef = useRef(null)

  const doubtRef = useRef(null)
  const quizRef = useRef(null)
  const summaryRef = useRef(null)
  const analyticsRef = useRef(null)
  const examRef = useRef(null)

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

  if (!token) {
    return <Auth setToken={setToken} setUser={setUser} />
  }

  return(

    <div className="dashboard">
      {/* Dynamic Background Elements */}
      <div className="bg-orb-1"></div>
      <div className="bg-orb-2"></div>

      <Sidebar
        scrollToSection={scrollToSection}
        dashboardRef={dashboardRef}
        studyRef={studyRef}
        weeklyRef={weeklyRef}
        pomodoroRef={pomodoroRef}
        aiRef={aiRef}
        doubtRef={doubtRef}
        quizRef={quizRef}
        summaryRef={summaryRef}
        analyticsRef={analyticsRef}
        examRef={examRef}
      />

      <div className="main">

        <Navbar user={user} setToken={setToken} setUser={setUser}/>

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

          <div ref={doubtRef} className="card">
            <AiDoubtSolver/>
          </div>

          <div ref={quizRef} className="card">
            <AiQuiz/>
          </div>

          <div ref={summaryRef} className="card">
            <AiSummarizer/>
          </div>

          <div ref={analyticsRef} className="card">
            <Analytics plan={plan}/>
          </div>

          <div ref={examRef} className="card">
            <ExamCountdown subjects={subjects}/>
          </div>

        </div>

      </div>

    </div>

  )
}

export default App