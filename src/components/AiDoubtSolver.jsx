import { useState } from "react"

function AiDoubtSolver(){

  const [question,setQuestion] = useState("")
  const [answer,setAnswer] = useState("")

  const askAI = () => {
    setAnswer("AI answer will appear here")
  }

  return(
    <div>

      <h3>AI Doubt Solver</h3>

      <input
        placeholder="Ask your question..."
        value={question}
        onChange={(e)=>setQuestion(e.target.value)}
      />

      <button onClick={askAI}>
        Ask AI
      </button>

      <p>{answer}</p>

    </div>
  )
}

export default AiDoubtSolver