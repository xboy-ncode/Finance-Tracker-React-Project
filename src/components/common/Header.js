import React from 'react';
import { MenuOutlined, CloseOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Avatar, Badge, Layout, Grid } from 'antd';

const { Header: AntHeader } = Layout;
const { useBreakpoint } = Grid;

const Header = ({ toggleCollapsed, collapsed, sidebarVisible, toggleSidebarVisibility }) => {
    const screens = useBreakpoint();
    const isMobile = !screens.md; // Consider screens smaller than md as mobile

    return (
        <AntHeader style={{
            background: '#4682B4',
            color: 'white',
            padding: '0 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 0 rgba(0, 0, 0, 0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            height: isMobile ? 56 : 64,
            lineHeight: isMobile ? '56px' : '64px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button 
                    type="text"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 0,
                        height: 40,
                        width: 40,
                        color: 'white'
                    }}
                    onClick={toggleCollapsed}
                    icon={isMobile && !collapsed ? 
                        <CloseOutlined style={{ color: 'white' }} /> : 
                        <MenuOutlined style={{ color: 'white' }} />
                    }
                />
                
                {/* <h1 style={{ 
                    margin: '0 0 0 15px', 
                    fontSize: '1.5rem', 
                    fontWeight: 600, 
                    color: 'white' 
                }}>
                    FinanceTracker
                </h1> */}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {!isMobile && (
                    <div style={{ 
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 4,
                        marginRight: 20,
                        width: 200
                    }}>
                    </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Badge count={5} offset={[0, 5]} size="small">
                        <BellOutlined style={{ 
                            fontSize: 18, 
                            marginRight: isMobile ? 10 : 15, 
                            color: 'white', 
                            cursor: 'pointer' 
                        }} />
                    </Badge>
                    <Avatar icon={<UserOutlined />} style={{ 
                        marginRight: 10, 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)' 
                    }} />
                    {!isMobile && (
                        <span style={{ 
                            fontSize: 14, 
                            fontWeight: 500, 
                            color: 'white' 
                        }}>
                            Usuario
                        </span>
                    )}
                </div>
            </div>
        </AntHeader>
    );
};

export default Header;