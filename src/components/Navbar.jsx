import { useState } from "react"

function Navbar({search,setSearch,sidebarOpen,setSidebarOpen, user, setToken, setUser}){

  const [profileOpen,setProfileOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  return(

    <div className="navbar">

      <div className="nav-left">

        <button
          className="menu-btn"
          onClick={()=>setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

        <input
          className="search"
          placeholder="Search subjects..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

      </div>

      <div className="profile-area" style={{ position: "relative" }}>

        <div
          className="profile"
          onClick={()=>setProfileOpen(!profileOpen)}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
        >
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=1e293b&color=fff`}
            alt="profile"
            style={{ borderRadius: "50%", width: "40px", height: "40px" }}
          />
          <span>{user?.name || 'Student'}</span>
        </div>

        {profileOpen && (

          <div className="profile-dropdown" style={{ position: "absolute", top: "50px", right: "0", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "10px", width: "150px", zIndex: 100 }}>

            <p style={{ padding: "8px", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>Profile</p>
            <p style={{ padding: "8px", cursor: "pointer" }}>Settings</p>
            <p onClick={handleLogout} style={{ padding: "8px", cursor: "pointer", color: "#ef4444", fontWeight: "bold", borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "5px" }}>Logout</p>

          </div>

        )}

      </div>

    </div>

  )

}

export default Navbar