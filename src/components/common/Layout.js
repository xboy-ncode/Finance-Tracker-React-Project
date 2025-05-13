import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Layout as AntLayout, Grid } from 'antd';
import './Layout.css';

// Import components
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const { Content } = AntLayout;
const { useBreakpoint } = Grid;

const Layout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const location = useLocation();
    const screens = useBreakpoint();
    const isMobile = !screens.md; // Consider screens smaller than md as mobile

    // Auto-collapse sidebar on mobile screens
    useEffect(() => {
        if (isMobile) {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
    }, [isMobile]);

    // Close sidebar when route changes on mobile
    useEffect(() => {
        if (isMobile) {
            setCollapsed(true);
        }
    }, [location.pathname, isMobile]);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    // Toggle sidebar visibility completely
    const toggleSidebarVisibility = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <AntLayout className={isMobile && !collapsed ? 'mobile-sidebar-open' : ''} style={{ minHeight: '100vh' }}>
            <Sidebar 
                className="sidebar"
                collapsed={collapsed} 
                toggleCollapsed={toggleCollapsed}
                visible={sidebarVisible}
            />
            
            <AntLayout style={{ 
                marginLeft: !sidebarVisible ? 0 : (isMobile ? 0 : (collapsed ? 80 : 250)),
                transition: 'all 0.2s'
            }}>
                <Header 
                    collapsed={collapsed}
                    toggleCollapsed={toggleCollapsed}
                    sidebarVisible={sidebarVisible}
                    toggleSidebarVisibility={toggleSidebarVisibility}
                />
                
                <Content style={{ 
                    margin: isMobile ? '8px 8px' : '24px 16px', 
                    padding: isMobile ? 12 : 24,
                    backgroundColor: '#fff',
                    borderRadius: 4,
                    minHeight: 280
                }}>
                    <Outlet />
                </Content>
                
                <Footer />
            </AntLayout>
        </AntLayout>
    );
};

export default Layout;