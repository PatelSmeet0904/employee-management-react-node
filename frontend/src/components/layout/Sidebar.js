import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDashboard, MdAddBox } from "react-icons/md";
import "./Layout.css"

let tabs = [
  { menu: 'Dashboard', href: '/', icon: <MdDashboard /> },
  { menu: 'Manage Employees', href: '/employeeList', icon: <MdAddBox /> },
]

const Sidebar = () => {

  let navigate = useNavigate()
  let currentPath = window.location.pathname
  const [selectedTab, setSelectedTab] = useState('')

  const handleSelectTab = (href) => {
    setSelectedTab(href)
    navigate(href)
  }

  useEffect(() => {
    let index = tabs.findIndex(tab => tab.href === currentPath)
    if (index >= 0) {
      setSelectedTab(currentPath)
    }
  }, [currentPath])

  return (
    <div className="sidebar-body">
      {tabs.map((tab, idx) => (
        <div key={idx} className={`sidebar-menu ${tab.href === selectedTab ? 'sidebar-selected-menu' : ''}`} onClick={() => handleSelectTab(tab.href)}>
          <div className="sidebar-menu-icon">{tab.icon}</div>
        </div>
      ))}
    </div>
  )
}

export default Sidebar