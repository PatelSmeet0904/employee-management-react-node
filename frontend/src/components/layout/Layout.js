import React from "react"
import Sidebar from "./Sidebar"
import "./Layout.css"

function Layout({ children }) {

  return (
    <div className="body-layout">
      <div className="side-bar">
        <Sidebar />
      </div>
      <div className="app-body">
        {children}
      </div>
    </div>
  )
}
export default Layout