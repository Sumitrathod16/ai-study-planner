import { useState, useRef, useEffect } from "react"

function Chatbot(){
  const [input,setInput] = useState("")
  const [messages,setMessages] = useState([{ type: "bot", text: "Hello! I am your AI Study Assistant. What do you need help with right now?" }])
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (text) => {
    const q = text.toLowerCase();
    if (q.includes("focus") || q.includes("concentrate") || q.includes("distract") || q.includes("procrastinat")) {
      return "Try the Pomodoro Technique: 25 minutes of intense focus followed by a 5-minute break. The dashboard has a Pomodoro timer built right in to help you manage this!";
    }
    if (q.includes("exam") || q.includes("test") || q.includes("quiz")) {
      return "For exams, active recall and spaced repetition are your best tools. Try using the AI Quiz Generator card to test your knowledge instead of passively re-reading notes.";
    }
    if (q.includes("schedule") || q.includes("plan") || q.includes("organize")) {
      return "Make sure to allocate more hours to 'Hard' subjects while keeping 'Easy' subjects for lighter study days. Have you checked out your auto-generated Study Plan above?";
    }
    if (q.includes("tired") || q.includes("sleep") || q.includes("exhaust")) {
      return "Rest is crucial for memory consolidation! If you're tired, stepping away for a 20-minute power nap or just closing your eyes will help more than forcing yourself to study while exhausted.";
    }
    
    // Generic fallback
    return `That's a great question regarding "${text}". To tackle this, try breaking the topic down into smaller, manageable chunks and focus on understanding the core foundation first before moving on.`;
  }

  const send = ()=>{
    if(!input.trim()) return
    const userText = input.trim();
    
    setMessages(prev => [...prev, {type:"user",text:userText}])
    setInput("")
    setLoading(true)

    setTimeout(() => {
      setMessages(prev => [...prev, {type:"bot",text: generateResponse(userText)}])
      setLoading(false)
    }, 1200)
  }

  return(
    <>
      <h3 style={{ marginBottom: "15px" }}>AI Study Assistant</h3>
      <div className="chat-box" style={{height: "300px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px", padding: "10px"}}>
        {messages.map((m,i)=>(
          <div key={i} style={{ 
            alignSelf: m.type === "user" ? "flex-end" : "flex-start", 
            background: m.type === "user" ? "var(--primary-color)" : "rgba(255,255,255,0.05)",
            border: m.type === "user" ? "none" : "1px solid var(--glass-border)",
            color: "white",
            padding: "10px 14px",
            borderRadius: "12px",
            maxWidth: "80%",
            fontSize: "14px",
            lineHeight: "1.5"
          }}>
            {m.text}
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: "flex-start", background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", padding: "10px 14px", borderRadius: "12px", color: "var(--text-muted)", fontSize: "14px" }}>
            Typing...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input" style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
        <input
          className="search"
          style={{ flex: 1 }}
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          placeholder="Ask for study tips, focus methods, or planning help..."
          onKeyDown={(e) => e.key === 'Enter' && send()}
        />
        <button className="add-btn" onClick={send} disabled={loading} style={{ padding: "0 20px" }}>
          Send
        </button>
      </div>
    </>
  )
}

export default Chatbot