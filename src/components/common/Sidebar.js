import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Grid } from 'antd';
import {
    PieChartOutlined,
    DollarOutlined,
    FileTextOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';

const { Sider } = Layout;
const { useBreakpoint } = Grid;

const Sidebar = ({ collapsed, toggleCollapsed, visible = true }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const screens = useBreakpoint();
    const isMobile = !screens.md; // Consider screens smaller than md as mobile
    const currentPath = location.pathname;

    // Don't render sidebar if visible is false
    if (!visible) return null;

    // Array of menu items for the sidebar
    const menuItems = [
        { key: '/', label: 'Dashboard', icon: <PieChartOutlined /> },
        { key: '/transactions', label: 'Transacciones', icon: <DollarOutlined /> },
        { key: '/reports', label: 'Reportes', icon: <FileTextOutlined /> },
        { key: '/settings', label: 'Configuración', icon: <SettingOutlined /> },
    ];

    // Convert menuItems to the format expected by Ant Design v4+
    const antMenuItems = menuItems.map(item => ({
        key: item.key,
        icon: item.icon,
        label: item.label
    }));

    // Handle menu item clicks
    const handleMenuClick = (info) => {
        navigate(info.key);
        
        // On mobile, auto-collapse the sidebar after navigation
        if (isMobile && !collapsed) {
            toggleCollapsed();
        }
    };

    return (
        <>
            {/* Overlay for mobile - only shown when sidebar is expanded on mobile */}
            {isMobile && !collapsed && (
                <div
                    className="mobile-sidebar-overlay"
                    onClick={toggleCollapsed}
                />
            )}

            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                collapsedWidth={isMobile ? 0 : 80}
                width={250}
                style={{
                    overflow: 'auto',
                    height: isMobile ? 'auto' : '100vh',
                    position: isMobile ? 'absolute' : 'fixed',
                    left: 0,
                    top: isMobile ? 56 : 0, // Place dropdown below header in mobile
                    bottom: 0,
                    zIndex: isMobile ? 999 : 1,
                    boxShadow: isMobile ? '0 4px 8px rgba(0, 0, 0, 0.15)' : '2px 0 5px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.2s',
                    backgroundColor: '#4682B4', // Match header color
                    display: (isMobile && collapsed) ? 'none' : 'block' // Hide when collapsed on mobile
                }}
                theme="dark" // Use dark theme for better contrast with blue background
            >
                {!isMobile && (
                    <div style={{
                        height: 64,
                        margin: 16,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {/* Logo area - only show in desktop mode */}
                        <h2 style={{ margin: 0, color: 'white' }}>
                            {collapsed ? 'FT' : 'FinanceTracker'}
                        </h2>
                    </div>
                )}

                <Menu
                    mode="inline"
                    selectedKeys={[currentPath]}
                    items={antMenuItems}
                    onClick={handleMenuClick}
                    theme="dark" // Match the theme to the sider
                    style={{
                        backgroundColor: 'transparent', // Keep menu background transparent
                        borderRight: 'none' // Remove border
                    }}
                />
            </Sider>
        </>
    );
};

Sidebar.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    toggleCollapsed: PropTypes.func.isRequired,
    visible: PropTypes.bool // Optional prop to completely hide sidebar
};

export default Sidebar;