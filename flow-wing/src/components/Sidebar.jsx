import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem(<Link to="/home">Gelen Kutusu</Link>, '1', <Icon icon="quill:mail" />),
  getItem(<Link to="/sent">Gönderilenler</Link>, '2', <Icon icon="icon-park-outline:message-sent" />),
  getItem(<Link to="/scheduled">Planlanmış Mailler</Link>, '3', <Icon icon="ic:sharp-schedule" />),
  getItem(<Link to="/compose-new">Mail Oluştur</Link>, '4', <Icon icon="streamline:chat-bubble-square-write" />),
  
];
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div
      style={{
        width: 256,
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};
export default Sidebar;