import React, { useState } from 'react'
import { Popover, Dropdown, Button, Menu, Divider, Badge } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faOutdent,
  faArrowRightFromBracket,
  faBell,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons'
import Avatar from '../../../assets/img/avatar-doraemon.jpg'

import './styles.scss'

const notification = [
  {
    id: 1,
    title: 'Thông báo từ Doraemon',
    content: 'Đã gửi bạn một email mới.',
    status: 'unread',
  },
  {
    id: 2,
    title: 'Thông báo từ Doraemon',
    content: 'Đã gửi bạn một email mới.',
    status: 'read',
  },
]

const content = (
  <div>
    {notification.map((cur, i) => {
      return (
        <div key={i}>
          <div>{cur.title}</div>
          <div>{cur.content}</div>
          <div>{cur.status}</div>
          {i < notification.length - 1 && <Divider />}
        </div>
      )
    })}
  </div>
)

function Header({ toggleCollapsed }) {
  const menu = (
    <Menu className="custom-menu">
      <Menu.Item className="custom-cursor" key="1" disabled>
        <div className="info" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={Avatar} />
          <span className="name">Doraemon</span>
          <span className="position">Robot</span>
          <span className="email">doraemon@gmail.com</span>
        </div>
      </Menu.Item>
      <Divider />
      <Menu.Item className="custom-cursor" key="2" disabled>
        <div className="button" style={{ display: 'flex', alignItems: 'center' }}>
          <Button className="edit-avatar" type="text" onClick={() => setOpenAvatar(true)}>
            <FontAwesomeIcon icon={faCircleInfo} />
            Xem ảnh đại diện
          </Button>
          <Button className="log-out" type="text">
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            Đăng xuất
          </Button>
        </div>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="header-layout">
      <div className="header-layout-left">
        <FontAwesomeIcon icon={faOutdent} onClick={toggleCollapsed} />
        <span>Công việc</span>
      </div>
      <div className="header-layout-right">
        <Popover placement="bottomRight" title={'Thông báo'} content={content} trigger="click">
          <Badge count={notification.length} className="bell">
            <FontAwesomeIcon icon={faBell} />
          </Badge>
        </Popover>
        <Dropdown
          overlay={menu}
          className="avatar"
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
          trigger={['click']}
        >
          <img onClick={(e) => e.preventDefault()} src={Avatar} />
        </Dropdown>
      </div>
    </div>
  )
}
export default Header
