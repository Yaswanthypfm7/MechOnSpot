import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MenuOutlined, PlusOutlined, CarOutlined, UserOutlined, ToolOutlined  } from '@ant-design/icons';

import icon from '../images/mechonspot.jpg';
import '../App.css'
const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 100) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo"><Link to="/">MechOnSpot</Link></Typography.Title>
        <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
      </div>
      {activeMenu && (
      <Menu theme="dark">
        <Menu.Item icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item icon={<PlusOutlined />}>
          <Link to="/newrequest">Add Request</Link>
        </Menu.Item>
        <Menu.Item icon={<CarOutlined />}>
          <Link to="/vehicle">Vehicles</Link>
        </Menu.Item>
        <Menu.Item icon={<UserOutlined />}>
          <Link to="/About">About</Link>
        </Menu.Item>
        <Menu.Item icon={<ToolOutlined  />}>
          <Link to="/Tips">Tips</Link>
        </Menu.Item>
      </Menu>
      )}
    </div>
  );
};

export default Navbar;
