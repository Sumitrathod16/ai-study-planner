function Sidebar({
  scrollToSection,
  dashboardRef,
  studyRef,
  weeklyRef,
  pomodoroRef,
  aiRef
}){

  return(

    <div className="sidebar">

      <h2>AI Planner</h2>

      <ul>

        <li onClick={()=>scrollToSection(dashboardRef)}>
          Dashboard
        </li>

        <li onClick={()=>scrollToSection(studyRef)}>
          Study Plan
        </li>

        <li onClick={()=>scrollToSection(weeklyRef)}>
          Weekly Planner
        </li>

        <li onClick={()=>scrollToSection(pomodoroRef)}>
          Pomodoro
        </li>

        <li onClick={()=>scrollToSection(aiRef)}>
          AI Assistant
        </li>

      </ul>

    </div>
  )
}

export default Sidebar