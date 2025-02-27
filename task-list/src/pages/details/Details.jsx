import React, { useState } from 'react'
import SideBar from './sidebar'
import Header from './header'
import TabsLayout from './tabs'
import Body from './body'

import './styles.scss'
function Details() {
  const [collapsed, setCollapsed] = useState(false)
  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev)
  }

  return (
    <div className="layout-task-list">
      <div className="layout-task-list-left">
        <SideBar collapsed={collapsed} />
      </div>
      <div className={`layout-task-list-right ${collapsed ? 'collapsed' : ''}`}>
        <Header toggleCollapsed={toggleCollapsed} />
        <TabsLayout />
      </div>
    </div>
  )
}

export default Details
