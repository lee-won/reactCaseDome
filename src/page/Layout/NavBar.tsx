import React from 'react'
import {Link} from 'react-router-dom'
import {Menu} from 'antd'
function NavBar() {
  return (
    <Menu
      mode="inline"
      theme="dark"
    >
      <Menu.Item key="1">
        <Link to='/'>滚动加载</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to='/form'>form表单</Link>
      </Menu.Item>
    </Menu>
  )
}
export default NavBar