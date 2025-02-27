import React, { useState } from 'react'
import LogoQuocDuy from '@/assets/svg/logo-quocduy.svg'
import LogoControlPanel from '@/assets/svg/logo-control-panel.svg'
import { Menu } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserPlus,
  faChartLine,
  faWarehouse,
  faUsersGear,
} from '@fortawesome/free-solid-svg-icons'
import './styles.scss'

const iconMap = [faUserPlus, faChartLine, faWarehouse, faUsersGear]

const items = [
  {
    type: 'divider',
  },
  {
    key: '1',
    label: 'Bảng điều khiển',
    icon: <img src={LogoControlPanel} />,
  },
  {
    key: 'g1',
    label: 'CÁ NHÂN',
    type: 'group',
    children: [
      {
        key: 'g1-1',
        label: 'Cá nhân',
        icon: <FontAwesomeIcon icon={iconMap[0]} />,
        children: [
          {
            key: 'g1-1-1',
            label: 'Công việc',
          },
          {
            key: 'g1-1-2',
            label: 'Hỗ trợ',
          },
        ],
      },
    ],
  },
  {
    key: 'g2',
    label: 'CÔNG VIỆC',
    type: 'group',
    children: [
      {
        key: 'g2-1',
        label: 'Kinh doanh',
        icon: <FontAwesomeIcon icon={iconMap[1]} />,
        children: [
          {
            key: 'g2-1-1',
            label: 'Đơn hàng',
          },
          {
            key: 'g2-1-2',
            label: 'Báo cáo',
          },
          {
            key: 'g2-1-3',
            label: 'Thống kê',
          },
        ],
      },
      {
        key: 'g2-2',
        label: 'Kho hàng',
        icon: <FontAwesomeIcon icon={iconMap[2]} />,
        children: [
          {
            key: 'g2-2-1',
            label: 'Sản phẩm',
          },
          {
            key: 'g2-2-2',
            label: 'Tài sản',
          },
          {
            key: 'g2-2-3',
            label: 'Nhà cung cấp',
          },
        ],
      },
      {
        key: 'g2-3',
        label: 'Nhân sự',
        icon: <FontAwesomeIcon icon={iconMap[3]} />,
        children: [
          {
            key: 'g2-3-1',
            label: 'Nhân viên',
          },
          {
            key: 'g2-3-2',
            label: 'Khoản vay',
          },
          {
            key: 'g2-3-3',
            label: 'Mục tiêu',
          },
        ],
      },
    ],
  },
]

const getLevelKeys = (items1) => {
  const key = {}
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level
      }
      if (item.children) {
        func(item.children, level + 1)
      }
    })
  }
  func(items1)
  return key
}
const levelKeys = getLevelKeys(items)

function SideBar({ collapsed }) {
  const [stateOpenKeys, setStateOpenKeys] = useState([])

  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1)

    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey])
      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      )
    } else {
      setStateOpenKeys(openKeys)
    }
  }

  return (
    <div className={`side-bar-layout ${collapsed ? 'collapsed' : ''}`}>
      <div className="logo-name">
        <img src={LogoQuocDuy} />
        <span>ERP QUỐC DUY</span>
      </div>
      <Menu
        mode="inline"
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        items={items}
        inlineCollapsed={collapsed ? true : false}
        triggerSubMenuAction="click"
      />
    </div>
  )
}

export default SideBar
