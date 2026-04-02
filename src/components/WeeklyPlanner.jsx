function WeeklyPlanner({ plan = [] }){

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ]

  return(

    <div>

      <h3>Weekly Planner</h3>

      {plan.length === 0 ? (
        <p>No study plan generated yet</p>
      ) : (

        days.map((day,index)=>{

          const task = plan[index % plan.length]

          return(

            <div key={index} className="week-item">

              <strong>{day}</strong>

              <p>
                {task.subject} — {task.hours} hrs
              </p>

            </div>

          )

        })

      )}

    </div>

  )
}

export default WeeklyPlanner