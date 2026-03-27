import { useState } from "react";
import { jsPDF } from "jspdf";

export default function AiSummarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSimulatedSummary = (inputText) => {
    const sentences = inputText
      .split(/(?<=[.!?])\s+/)
      .map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length > 0);

    if (sentences.length === 0) return "";

    const importantWords = [
      "important",
      "must",
      "key",
      "critical",
      "main",
      "core",
      "essential",
      "therefore",
      "because",
      "result",
      "conclusion",
      "formula",
      "definition",
      "exam",
      "note"
    ];

    const scoredSentences = sentences.map((sentence, index) => {
      const lower = sentence.toLowerCase();
      const keywordScore = importantWords.reduce(
        (score, word) => (lower.includes(word) ? score + 2 : score),
        0
      );
      const hasNumber = /\d/.test(sentence) ? 1 : 0;
      const lengthScore = sentence.length >= 40 && sentence.length <= 180 ? 1 : 0;
      const score = keywordScore + hasNumber + lengthScore;

      return { sentence, index, score };
    });

    const selectedCount = Math.min(5, Math.max(2, Math.ceil(sentences.length * 0.4)));

    const topImportant = scoredSentences
      .sort((a, b) => b.score - a.score)
      .slice(0, selectedCount)
      .sort((a, b) => a.index - b.index)
      .map((item) => item.sentence);

    return ["Important Points:", ...topImportant.map((point) => `- ${point}`)].join("\n");
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

  const downloadSummaryAsPDF = () => {
    if (!summary) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("AI Summary", 14, 18);
    doc.setFontSize(11);

    const lines = doc.splitTextToSize(summary, 180);
    doc.text(lines, 14, 30);
    doc.save("summary.pdf");
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
      
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={summarizeText} className="generate-btn" style={{ flex: 1 }}>
          {loading ? "Summarizing..." : "Summarize Text"}
        </button>
        <button
          onClick={downloadSummaryAsPDF}
          className="generate-btn"
          disabled={!summary}
          style={{ flex: 1, opacity: summary ? 1 : 0.6, cursor: summary ? "pointer" : "not-allowed" }}
        >
          Save as PDF
        </button>
      </div>

      {summary && (
        <div className="chat-box" style={{height: "auto", marginTop: "15px"}}>
           <div className="bot" style={{maxWidth: "100%"}}>
             <strong>Summary:</strong>
             <pre
               style={{
                 marginTop: "8px",
                 whiteSpace: "pre-wrap",
                 fontFamily: "inherit",
                 lineHeight: "1.6"
               }}
             >
               {summary}
             </pre>
           </div>
        </div>
      )}
    </>
  );
}
