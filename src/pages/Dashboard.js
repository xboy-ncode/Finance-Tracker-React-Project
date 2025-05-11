import React, { useState, useEffect } from 'react';
import { Typography, Select, Spin, Alert, Row, Col, Card } from 'antd';
import { DashboardOutlined } from '@ant-design/icons';


// Import dashboard components
import OverviewCards from '../components/dashboard/OverviewCards';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import ExpenseByCategoryChart from '../components/dashboard/ExpenseByCategoryChart';
import MonthlyBalanceChart from '../components/dashboard/MonthlyBalanceChart';
import UpcomingBills from '../components/dashboard/UpcomingBills';

// Mock data import (will be replaced by API calls)
import { mockDashboardData } from '../utils/mockData';

const { Title } = Typography;
const { Option } = Select;

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timePeriod, setTimePeriod] = useState('this-month');

    useEffect(() => {
        // Simulate API call
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // Here would be the actual API call
                // const response = await api.getDashboardData(timePeriod);
                // setDashboardData(response.data);
                
                // Using mock data for now
                setTimeout(() => {
                    setDashboardData(mockDashboardData);
                    setIsLoading(false);
                }, 800);
            } catch (err) {
                setError('Error al cargar los datos del dashboard');
                setIsLoading(false);
            }
        };

        fetchData();
    }, [timePeriod]); // Refetch when time period changes

    const handlePeriodChange = (value) => {
        setTimePeriod(value);
    };

    if (isLoading) {
        return (
            <div className="dashboard-loading">
                <Spin size="large" tip="Cargando información financiera..." />
            </div>
        );
    }

    if (error) {
        return (
            <Alert
                message="Error"
                description={error}
                type="error"
                showIcon
                className="dashboard-error"
            />
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="header-title">
                    <DashboardOutlined className="dashboard-icon" />
                    <Title level={2}>Panel de Control Financiero</Title>
                </div>
                <div className="date-filter">
                    <span className="filter-label">Periodo:</span>
                    <Select 
                        defaultValue={timePeriod} 
                        onChange={handlePeriodChange}
                        className="period-select"
                    >
                        <Option value="this-month">Este mes</Option>
                        <Option value="last-month">Mes pasado</Option>
                        <Option value="last-3-months">Últimos 3 meses</Option>
                        <Option value="this-year">Este año</Option>
                    </Select>
                </div>
            </div>

            {/* Overview Cards don't need a card wrapper */}
            <OverviewCards data={dashboardData.overview} />

            <Row gutter={[24, 24]} className="chart-row">
                <Col xs={24} lg={12}>
                    <Card className="dashboard-card" bodyStyle={{ padding: "16px", height: "400px" }}>
                        <MonthlyBalanceChart data={dashboardData.monthlyBalance} />
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card className="dashboard-card" bodyStyle={{ padding: "16px", height: "400px" }}>
                        <ExpenseByCategoryChart data={dashboardData.expensesByCategory} />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[24, 24]} className="data-row">
                <Col xs={24} lg={12}>
                    <Card className="dashboard-card" bodyStyle={{ padding: "16px", height: "400px" }}>
                        <RecentTransactions transactions={dashboardData.recentTransactions} />
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card className="dashboard-card" bodyStyle={{ padding: "16px", height: "400px" }}>
                        <UpcomingBills bills={dashboardData.upcomingBills} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;