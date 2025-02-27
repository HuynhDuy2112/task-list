import React from 'react'
import { Tabs, Button } from 'antd'
import Body from '../body'
import './styles.scss'
function TabsLayout() {
  const items = [
    {
      key: '1',
      label: 'Việc cần làm',
      children: <Body />,
    },
    {
      key: '2',
      label: 'Việc giao cho tôi',
      // children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Liên quan đến tôi',
      // children: 'Content of Tab Pane 3',
    },
    {
      key: '4',
      label: 'Việc chờ duyệt',
      // children: 'Content of Tab Pane 3',
    },
    {
      key: '5',
      label: 'Việc tôi giao',
      // children: 'Content of Tab Pane 3',
    },
    {
      key: '6',
      label: 'Việc tôi quản lí',
      // children: 'Content of Tab Pane 3',
    },
  ]

  return (
    <div className="tabs-layout">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  )
}

export default TabsLayout
