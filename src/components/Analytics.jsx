export default function Analytics({ plan }) {
  const totalTasks = plan ? plan.length : 0;
  
  return (
    <>
      <h3>Study Analytics</h3>
      
      <div style={{display: "flex", gap: "15px", marginTop: "15px"}}>
        <div style={{flex: 1, background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "12px", textAlign: "center", border: "1px solid var(--glass-border)"}}>
          <h4 style={{color: "var(--text-muted)", fontSize: "14px", marginBottom: "8px"}}>Total Topics</h4>
          <span style={{fontSize: "32px", fontWeight: "800", color: "var(--success)"}}>{totalTasks}</span>
        </div>
        
        <div style={{flex: 1, background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "12px", textAlign: "center", border: "1px solid var(--glass-border)"}}>
          <h4 style={{color: "var(--text-muted)", fontSize: "14px", marginBottom: "8px"}}>Est. Hours</h4>
          <span style={{fontSize: "32px", fontWeight: "800", color: "var(--accent-primary)"}}>{totalTasks * 2}</span>
        </div>
      </div>
      
      <div style={{marginTop: "20px", padding: "15px", background: "rgba(124,58,237,0.1)", borderRadius: "12px", border: "1px solid var(--accent-glow)"}}>
        <p style={{fontSize: "14px", color: "var(--text-main)", margin: 0}}>
          Consistency is key! You have <strong>{totalTasks}</strong> topics in your active plan.
        </p>
      </div>
    </>
  );
}
