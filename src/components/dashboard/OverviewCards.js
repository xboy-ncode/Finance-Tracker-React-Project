import React from 'react';
import './OverviewCards.css';

const OverviewCards = ({ data }) => {
    const { totalBalance, income, expenses, savings } = data;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    };

    const calculatePercentage = (current, previous) => {
        if (!previous) return 0;
        return ((current - previous) / previous) * 100;
    };

    const renderTrend = (current, previous) => {
        const percentage = calculatePercentage(current, previous);
        const isPositive = percentage > 0;
        const isNeutral = percentage === 0;

        // Clase CSS basada en si el cambio es positivo o negativo
        // Para el balance y ahorro, positivo es bueno; para gastos, negativo es bueno
        let trend = 'neutral';
        if (!isNeutral) {
            if (current === expenses) {
                // Para gastos, reducción (negativo) es bueno
                trend = isPositive ? 'negative' : 'positive';
            } else {
                // Para ingresos y balance, aumento (positivo) es bueno
                trend = isPositive ? 'positive' : 'negative';
            }
        }

        return (
            <div className={`trend ${trend}`}>
                <span className="trend-icon">
                    {isNeutral ? '•' : isPositive ? '▲' : '▼'}
                </span>
                <span className="trend-value">
                    {Math.abs(percentage).toFixed(1)}%
                </span>
            </div>
        );
    };

    return (
        <div className="overview-cards">
            <div className="card overview-card">
                <div className="card-info">
                    <h3>Balance Total</h3>
                    <div className="card-value">{formatCurrency(totalBalance.current)}</div>
                    {renderTrend(totalBalance.current, totalBalance.previous)}
                </div>
                <div className="card-icon balance-icon">💰</div>
            </div>

            <div className="card overview-card">
                <div className="card-info">
                    <h3>Ingresos</h3>
                    <div className="card-value">{formatCurrency(income.current)}</div>
                    {renderTrend(income.current, income.previous)}
                </div>
                <div className="card-icon income-icon">💵</div>
            </div>

            <div className="card overview-card">
                <div className="card-info">
                    <h3>Gastos</h3>
                    <div className="card-value">{formatCurrency(expenses.current)}</div>
                    {renderTrend(expenses.current, expenses.previous)}
                </div>
                <div className="card-icon expense-icon">📉</div>
            </div>

            <div className="card overview-card">
                <div className="card-info">
                    <h3>Ahorros</h3>
                    <div className="card-value">{formatCurrency(savings.current)}</div>
                    {renderTrend(savings.current, savings.previous)}
                </div>
                <div className="card-icon savings-icon">🏦</div>
            </div>
        </div>
    );
};

export default OverviewCards;