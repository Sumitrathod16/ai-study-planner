import { useState } from "react"

function StudyForm({ subjects = [], setSubjects, setPlan }) {

  const [subject, setSubject] = useState("")
  const [difficulty, setDifficulty] = useState("medium")
  const [examDate, setExamDate] = useState("")

  const addSubject = (e) => {
    e.preventDefault()

    const newSubject = {
      subject,
      difficulty,
      examDate
    }

    setSubjects([...subjects, newSubject])

    setSubject("")
    setExamDate("")
  }

  const generatePlan = () => {

    const today = new Date()

    const generated = subjects.map((sub) => {

      const exam = new Date(sub.examDate)

      const daysLeft = Math.ceil(
        (exam - today) / (1000 * 60 * 60 * 24)
      )

      let hours = 1
      if (sub.difficulty === "hard") hours = 3
      if (sub.difficulty === "medium") hours = 2
      if (sub.difficulty === "easy") hours = 1

      return {
        subject: sub.subject,
        hours,
        examDate: sub.examDate,
        daysLeft
      }
    })

    setPlan(generated)
  }

  return (
    <div className="study-form">

      <h3>Add Subject</h3>

      <form onSubmit={addSubject}>

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <input
          type="date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          required
        />

        {/* BUTTON ROW */}
        <div className="button-row">

          <button type="submit" className="add-btn">
            Add Subject
          </button>

          <button
            type="button"
            className="generate-btn"
            onClick={generatePlan}
          >
            Generate AI Study Planner
          </button>

        </div>

      </form>

    </div>
  )
}

export default StudyForm