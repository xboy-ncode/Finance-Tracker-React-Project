import React from 'react';
import { Link } from 'react-router-dom';
import './RecentTransactions.css';

const RecentTransactions = ({ transactions }) => {
    // Función para formatear moneda
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    };

    // Función para formatear fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);
    };

    return (
        <div className="recent-transactions-container">
            <div className="section-header">
                <h2>Transacciones Recientes</h2>
                <Link to="/transactions" className="see-all-link">
                    Ver todas
                </Link>
            </div>

            <div className="transactions-list">
                {transactions.length === 0 ? (
                    <div className="no-transactions">No hay transacciones recientes</div>
                ) : (
                    transactions.map((transaction) => (
                        <div key={transaction.id} className="transaction-item">
                            <div className="transaction-icon" style={{ backgroundColor: transaction.type === 'income' ? '#e6f7ee' : '#ffe9e9' }}>
                                {transaction.type === 'income' ? '↑' : '↓'}
                            </div>
                            <div className="transaction-details">
                                <div className="transaction-name">{transaction.description}</div>
                                <div className="transaction-category">{transaction.category}</div>
                            </div>
                            <div className="transaction-info">
                                <div className={`transaction-amount ${transaction.type === 'income' ? 'income' : 'expense'}`}>
                                    {transaction.type === 'income' ? '+' : '-'} {formatCurrency(Math.abs(transaction.amount))}
                                </div>
                                <div className="transaction-date">{formatDate(transaction.date)}</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RecentTransactions;