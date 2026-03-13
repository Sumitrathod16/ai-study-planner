import { useState } from "react"

function Navbar({search,setSearch,sidebarOpen,setSidebarOpen}){

  const [profileOpen,setProfileOpen] = useState(false)

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

      <div className="profile-area">

        <div
          className="profile"
          onClick={()=>setProfileOpen(!profileOpen)}
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
          />
          <span>Student</span>
        </div>

        {profileOpen && (

          <div className="profile-dropdown">

            <p>Profile</p>
            <p>Settings</p>
            <p>Logout</p>

          </div>

        )}

      </div>

    </div>

  )

}

export default Navbar