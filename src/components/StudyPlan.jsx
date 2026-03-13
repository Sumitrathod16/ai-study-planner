function StudyPlan({ plan = [] }) {

  return (

    <div>

      <h3>Study Plan</h3>

      {plan.length === 0 ? (
        <p>No plan generated yet</p>
      ) : (
        plan.map((item, index) => (

          <div key={index} className="plan-item">

            <h4>{item.subject}</h4>

            <p>Study Hours: {item.hours} hrs/day</p>

            <p>Exam Date: {item.examDate}</p>

            <p>Days Left: {item.daysLeft}</p>

          </div>

        ))
      )}

    </div>

  )
}

export default StudyPlan