import { useState, useEffect } from "react";

export default function ExamCountdown({ subjects }) {
  const [closestExam, setClosestExam] = useState(null);

  useEffect(() => {
    if (subjects && subjects.length > 0) {
      // Assuming subjects array objects have {name, examDate} or similar
      // Need to filter out objects without a date or invalid dates
      let validExams = subjects.filter(s => s.examDate && !isNaN(new Date(s.examDate).getTime()));
      if (validExams.length > 0) {
        let sorted = validExams.sort((a, b) => new Date(a.examDate) - new Date(b.examDate));
        setClosestExam(sorted[0]);
      } else {
        setClosestExam(null);
      }
    } else {
      setClosestExam(null);
    }
  }, [subjects]);

  return (
    <>
      <h3>Exam Countdown</h3>
      
      {closestExam ? (
        <div style={{marginTop: "20px", textAlign: "center"}}>
          <h4 style={{fontSize: "18px", color: "var(--text-muted)", marginBottom: "15px"}}>{closestExam.name || closestExam.subject || 'Upcoming Exam'}</h4>
          <div style={{fontSize: "48px", fontWeight: "800", background: "linear-gradient(135deg, #f43f5e, #fb923c)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent"}}>
             {Math.max(0, Math.ceil((new Date(closestExam.examDate) - new Date()) / (1000 * 60 * 60 * 24)))} Days
          </div>
          <p style={{marginTop: "10px", fontSize: "14px", color: "var(--text-muted)"}}>{new Date(closestExam.examDate).toLocaleDateString()}</p>
        </div>
      ) : (
        <div style={{textAlign: "center", padding: "30px 0", color: "var(--text-muted)"}}>
          <p>No upcoming exams found.</p>
          <p style={{fontSize: "12px", marginTop: "5px"}}>Add subjects with dates in the Study Planner.</p>
        </div>
      )}
    </>
  );
}
