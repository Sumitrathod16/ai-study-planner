import { useState, useEffect } from "react"

function PomodoroTimer(){

  const [time,setTime] = useState(1500)
  const [running,setRunning] = useState(false)

  useEffect(()=>{

    let timer

    if(running && time > 0){

      timer = setInterval(()=>{
        setTime(t => t - 1)
      },1000)

    }

    return ()=>clearInterval(timer)

  },[running,time])

  const minutes = Math.floor(time/60)
  const seconds = time % 60

  return(

    <div className="card">

      <h3>Pomodoro Timer</h3>

      <h1>
        {minutes}:{seconds < 10 ? "0" : ""}{seconds}
      </h1>

      <button onClick={()=>setRunning(true)}>Start</button>

      <button onClick={()=>setRunning(false)}>Pause</button>

      <button onClick={()=>setTime(1500)}>Reset</button>

    </div>

  )

}

export default PomodoroTimer