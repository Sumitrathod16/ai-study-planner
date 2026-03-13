import { useState } from "react"

function Chatbot(){

  const [input,setInput] = useState("")
  const [messages,setMessages] = useState([])

  const send = ()=>{

    if(!input) return

    let reply = "Follow your AI study plan!"

    if(input.includes("focus"))
      reply = "Try 25 min study + 5 min break."

    if(input.includes("exam"))
      reply = "Revise high priority subjects first."

    setMessages([
      ...messages,
      {type:"user",text:input},
      {type:"bot",text:reply}
    ])

    setInput("")

  }

  return(

    <div className="card">

      <h3>AI Study Assistant</h3>

      <div className="chat-box">

        {messages.map((m,i)=>(
          <p key={i} className={m.type}>
            {m.text}
          </p>
        ))}

      </div>

      <div className="chat-input">

        <input
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          placeholder="Ask study tips..."
        />

        <button onClick={send}>
          Send
        </button>

      </div>

    </div>

  )

}

export default Chatbot