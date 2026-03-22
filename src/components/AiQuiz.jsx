import { useState } from "react";

export default function AiQuiz() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // A smarter mock that generates topic-specific questions and a generic fallback
  const simulatedQuizGenerator = (subject) => {
    const t = subject.trim().toLowerCase();
    
    // Topic Dictionary for realistic mock quizzes
    const data = {
      math: [
        { q: "What is the value of Pi to two decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], a: "3.14" },
        { q: "What is the square root of 144?", options: ["10", "12", "14", "16"], a: "12" },
        { q: "What is 15% of 200?", options: ["20", "30", "40", "50"], a: "30" }
      ],
      science: [
        { q: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Body"], a: "Mitochondria" },
        { q: "What is the chemical symbol for Gold?", options: ["Ag", "Au", "Pb", "Fe"], a: "Au" },
        { q: "How many planets are in our solar system?", options: ["7", "8", "9", "10"], a: "8" }
      ],
      history: [
        { q: "Who was the first President of the United States?", options: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "John Adams"], a: "George Washington" },
        { q: "In what year did World War II end?", options: ["1943", "1945", "1947", "1950"], a: "1945" },
        { q: "Who discovered America?", options: ["Christopher Columbus", "Leif Erikson", "Ferdinand Magellan", "James Cook"], a: "Christopher Columbus" }
      ],
      react: [
        { q: "What is used to manage state in React functional components?", options: ["useEffect", "useState", "useContext", "useReducer"], a: "useState" },
        { q: "What does JSX stand for?", options: ["JavaScript XML", "Java Syntax Extension", "JSON X", "JavaScript Extension"], a: "JavaScript XML" },
        { q: "Which of the following is used to pass data to components from outside?", options: ["State", "Render", "Props", "PropTypes"], a: "Props" }
      ]
    };

    if (data[t]) return data[t];

    // Dynamic Generic Fallback using their topic
    return [
        { q: `What is the fundamental concept behind ${subject}?`, options: ["Efficiency", "Structural Integrity", "Modularity", "All of the above"], a: "All of the above" },
        { q: `When studying ${subject}, what is considered a best practice?`, options: ["Ignoring edge cases", "Consistent terminology", "Randomized guessing", "Manual verification only"], a: "Consistent terminology" },
        { q: `Which industry benefits the most from advancements in ${subject}?`, options: ["Technology", "Healthcare", "Finance", "It's universally applicable"], a: "It's universally applicable" }
    ];
  };

  const generateQuiz = () => {
    if (!topic) return;
    setLoading(true);
    setShowResults(false);
    setAnswers({});
    
    setTimeout(() => {
      setQuiz(simulatedQuizGenerator(topic));
      setLoading(false);
    }, 1500);
  };

  const handleSelect = (qIndex, option) => {
    if (showResults) return; // Prevent changing answer after submission
    setAnswers(prev => ({ ...prev, [qIndex]: option }));
  };

  const calculateScore = () => {
    let score = 0;
    quiz.forEach((q, i) => {
      if (answers[i] === q.a) score += 1;
    });
    return score;
  };

  return (
    <>
      <h3>AI Quiz Generator</h3>
      {!quiz ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "15px" }}>
          <input 
            className="search"
            placeholder="Enter a subject (e.g. Science, Math, React)..." 
            value={topic} 
            onChange={(e) => setTopic(e.target.value)} 
          />
          <button onClick={generateQuiz} className="generate-btn" style={{width: "100%"}} disabled={loading}>
            {loading ? "Generating Quiz..." : "Generate Quiz"}
          </button>
        </div>
      ) : (
        <div className="chat-box" style={{height: "auto", maxHeight: "350px", marginTop: "15px", paddingRight: "10px"}}>
          <h4 style={{ marginBottom: "15px", textAlign: "center", color: "var(--primary-color)" }}>Topic: {topic}</h4>
          
          {quiz.map((item, i) => (
             <div key={i} className="bot" style={{marginBottom: "15px", width: "100%", maxWidth: "100%"}}>
               <strong style={{ fontSize: "15px" }}>Q{i+1}: {item.q}</strong>
               
               <ul style={{listStyle:"none", marginTop: "10px", display:"flex", flexDirection:"column", gap:"8px"}}>
                 {item.options.map((opt, j) => {
                    let bgColor = "rgba(255,255,255,0.05)";
                    let border = "1px solid transparent";

                    if (showResults) {
                      if (opt === item.a) {
                        bgColor = "rgba(16, 185, 129, 0.2)"; // Green for correct
                        border = "1px solid #10b981";
                      } else if (answers[i] === opt && opt !== item.a) {
                        bgColor = "rgba(239, 68, 68, 0.2)"; // Red for wrong selection
                        border = "1px solid #ef4444";
                      }
                    } else if (answers[i] === opt) {
                       bgColor = "rgba(99, 102, 241, 0.3)"; // Highlight selected
                       border = "1px solid #6366f1";
                    }

                    return (
                      <li 
                        key={j} 
                        onClick={() => handleSelect(i, opt)}
                        style={{
                          background: bgColor, 
                          border: border,
                          padding:"10px 12px", 
                          borderRadius:"8px", 
                          cursor: showResults ? "default" : "pointer",
                          transition: "all 0.2s"
                        }}
                      >
                        {opt}
                      </li>
                    )
                 })}
               </ul>
             </div>
          ))}

          {showResults ? (
            <div style={{ textAlign: "center", marginTop: "20px", padding: "15px", background: "rgba(255,255,255,0.05)", borderRadius: "10px" }}>
              <h3 style={{ marginBottom: "10px" }}>You scored {calculateScore()} out of {quiz.length}!</h3>
              <button onClick={() => { setQuiz(null); setTopic(""); }} className="add-btn" style={{ padding: "8px 16px" }}>
                Generate Another Quiz
              </button>
            </div>
          ) : (
             <button 
               onClick={() => setShowResults(true)} 
               className="generate-btn" 
               style={{ width: "100%", marginTop: "10px" }}
               disabled={Object.keys(answers).length !== quiz.length}
             >
               {Object.keys(answers).length !== quiz.length ? "Answer all questions to submit" : "Submit Quiz"}
             </button>
          )}
        </div>
      )}
    </>
  );
}
