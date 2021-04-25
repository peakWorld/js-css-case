import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { LocationState, PLATFORM_CONFIG } from '@constants/routes';

interface MenuBarProps {
  data: LocationState;
}
const { SubMenu, Item } = Menu;

const MenuBar = ({ data }: MenuBarProps) => {
  const { rid, ...rest } = data;
  const [selectedKeys, setSelectedKeys] = useState([rid]);
  const [openKeys, setOpenKeys] = useState([rid[0]]);

  useEffect(() => {
    if (rid !== selectedKeys[0]) {
      setSelectedKeys([rid]); // 单选
      setOpenKeys((keys) => [...keys, rid[0]]); // // 打开多个SubMenu
    }
  }, [rid, selectedKeys]);

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onSelect={({ selectedKeys }) => setSelectedKeys(selectedKeys as string[])}
      onOpenChange={(openKeys) => setOpenKeys(openKeys as string[])}
    >
      {PLATFORM_CONFIG.map(({ pid, title, icon: Icon, children }) => {
        if (children && children.length > 0) {
          return (
            <SubMenu
              key={pid}
              title={
                <span>
                  <Icon />
                  <span>{title}</span>
                </span>
              }
            >
              {children.map(({ rid: cRid, title: cTitle, path, hide }) => {
                const restState = cRid === rid ? rest : {};
                const title = cRid === rid && rest.title ? rest.title : cTitle;
                if (!hide) {
                  return (
                    <Item key={cRid}>
                      <Link to={{ pathname: path as string, state: { rid: cRid, ...restState } }}>{title}</Link>
                    </Item>
                  );
                }
                return null;
              })}
            </SubMenu>
          );
        }
        return null;
      })}
    </Menu>
  );
};

export default MenuBar;
