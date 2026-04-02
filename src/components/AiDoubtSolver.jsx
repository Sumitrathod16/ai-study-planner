import { useState } from "react"

function AiDoubtSolver(){
  const [question,setQuestion] = useState("")
  const [answers,setAnswers] = useState([])
  const [loading, setLoading] = useState(false)

  const simulateDoubtResolution = (q) => {
    return [
      `To resolve your doubt regarding "${q}", let's break it down structurally:`,
      `1. **Core Concept:** First, identify the foundational rule or formula related to this. Everything builds upon the basics. What is the fundamental definition?`,
      `2. **Step-by-Step Analysis:** Look at the specific variables or constraints in your problem. How do they interact? Often, isolating one part of the problem makes the rest clear.`,
      `3. **Common Pitfall:** A lot of students get confused here by overcomplicating the context. Remember: keep it simple and double-check your initial assumptions.`,
      `I recommend reviewing the related introductory chapter in your study material and comparing it directly against this breakdown. You've got this!`
    ];
  };

  const askAI = () => {
    if(!question.trim()) return;
    
    setLoading(true);
    setAnswers([]);
    
    setTimeout(() => {
      setAnswers(simulateDoubtResolution(question));
      setLoading(false);
    }, 1800);
  }

  return(
    <>
      <h3 style={{ marginBottom: "15px" }}>AI Doubt Solver</h3>

      <div style={{ display: "flex", gap: "10px" }}>
         <input
           className="search"
           style={{ flex: 1 }}
           placeholder="What concept or problem are you struggling with?"
           value={question}
           onChange={(e)=>setQuestion(e.target.value)}
           onKeyDown={(e) => e.key === 'Enter' && askAI()}
         />
         <button className="generate-btn" onClick={askAI} disabled={loading} style={{ padding: "0 20px", whiteSpace: "nowrap" }}>
           {loading ? "Thinking..." : "Get Solution"}
         </button>
      </div>

      {(answers.length > 0 || loading) && (
        <div className="chat-box" style={{ marginTop: "20px", padding: "20px", background: "rgba(0,0,0,0.2)", borderRadius: "12px", border: "1px solid var(--glass-border)" }}>
          {loading ? (
             <div style={{ display: "flex", alignItems: "center", gap: "15px", color: "var(--primary-color)" }}>
                <span className="loader" style={{ width: "20px", height: "20px", border: "3px solid rgba(255,255,255,0.1)", borderTopColor: "var(--primary-color)", borderRadius: "50%", animation: "spin 1s linear infinite" }}></span>
                <span style={{ fontWeight: "500" }}>Analyzing your doubt...</span>
             </div>
          ) : (
             <div style={{ display: "flex", flexDirection: "column", gap: "12px", color: "var(--text-main)", lineHeight: "1.6", fontSize: "15px" }}>
                <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "12px", marginBottom: "5px" }}>
                  <strong style={{ color: "var(--primary-color)" }}>Your Query: </strong>{question}
                </div>
                {answers.map((paragraph, idx) => (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-info); font-weight: 600;">$1</strong>') }} />
                ))}
             </div>
          )}
        </div>
      )}
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </>
  )
}

export default AiDoubtSolver