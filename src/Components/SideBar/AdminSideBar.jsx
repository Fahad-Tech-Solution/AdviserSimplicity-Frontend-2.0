import React, { useState } from 'react';
import { Button, Menu } from 'antd';
import { MdMailOutline, MdOutlineControlCamera, MdOutlineDesktopWindows, MdPieChartOutlined } from 'react-icons/md';
import { RiAppsLine, RiMenu2Fill, RiMenuFill } from 'react-icons/ri';
import AdviserS1 from "../Assets/Adviser-Simpilicity1.png";

const { SubMenu } = Menu;

const AdminSideBar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div
            style={{
                width: 256,
            }}
            className='AdminSideBar'

        >

            <Menu
                mode="inline"
                inlineCollapsed={collapsed}
            >
                {/* Custom Option 1 */}
                <Menu.Item className='customeSideHead' key="1" style={{ height: "5rem" }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                        <h5 onClick={close} role="button">
                            <img src={AdviserS1} alt="Logo" width={"170px"} />
                        </h5>
                    </div>
                </Menu.Item>

                <Menu.Item key="2" icon={<MdOutlineDesktopWindows />}>
                    Option 2
                </Menu.Item>

                <Menu.Item key="3" icon={<MdOutlineControlCamera />}>
                    Option 3
                </Menu.Item>

                <SubMenu key="sub1" icon={<MdMailOutline />} title="Navigation One">
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>

                <SubMenu key="sub2" icon={<RiAppsLine />} title="Navigation Two">
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                    </SubMenu>
                </SubMenu>
            </Menu>
        </div>
    );
};

export default AdminSideBar;
