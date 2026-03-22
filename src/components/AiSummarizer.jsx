import { useState } from "react";

export default function AiSummarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSimulatedSummary = (inputText) => {
    // Split by punctuation followed by space
    const sentences = inputText.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
    
    if (sentences.length <= 2) {
      return sentences.join(" "); // Too short to summarize, return as is
    }

    // Always include the first sentence (usually the topic)
    const summarySentences = [sentences[0].trim()];
    
    // Find the longest sentence from the remaining as It usually contains the most detail
    let middleSentences = sentences.slice(1, sentences.length > 3 ? sentences.length - 1 : sentences.length);
    if (middleSentences.length > 0) {
       let longest = middleSentences.reduce((a, b) => a.length > b.length ? a : b);
       summarySentences.push(longest.trim());
    }

    // Include the last sentence if the text is long enough (usually the conclusion)
    if (sentences.length > 3) {
      summarySentences.push(sentences[sentences.length - 1].trim());
    }

    return "Key Points: " + summarySentences.join(" ");
  };

  const summarizeText = () => {
    if (!text) return;
    setLoading(true);
    setSummary("");
    setTimeout(() => {
      setSummary(generateSimulatedSummary(text));
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <h3>AI Summarizer</h3>
      <textarea 
        placeholder="Paste your notes or text here..." 
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%", 
          height: "100px", 
          background: "rgba(0,0,0,0.2)", 
          border: "1px solid var(--glass-border)", 
          borderRadius: "12px", 
          color: "var(--text-main)", 
          padding: "14px 18px", 
          resize: "none", 
          marginBottom: "15px",
          fontFamily: "inherit"
        }}
      ></textarea>
      
      <button onClick={summarizeText} className="generate-btn" style={{width: "100%"}}>
         {loading ? "Summarizing..." : "Summarize Text"}
      </button>

      {summary && (
        <div className="chat-box" style={{height: "auto", marginTop: "15px"}}>
           <div className="bot" style={{maxWidth: "100%"}}>
              <strong>Summary:</strong> {summary}
           </div>
        </div>
      )}
    </>
  );
}
