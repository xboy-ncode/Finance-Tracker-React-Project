import React, { useState } from 'react';
import './UpcomingBills.css';
import AddBillForm from './AddBillForm';
import './AddBillForm.css'; // Import the CSS file we created

const UpcomingBills = ({ bills }) => {
    const [billsList, setBillsList] = useState(bills);
    const [showAddForm, setShowAddForm] = useState(false);

    // Formatear moneda
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    };

    // Formatear fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('es-ES', {
            day: '2-digit',
            month: '2-digit'
        }).format(date);
    };

    // Función para calcular los días restantes
    const getDaysRemaining = (dueDate) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const due = new Date(dueDate);
        due.setHours(0, 0, 0, 0);

        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays;
    };

    // Función para determinar el estado del pago
    const getPaymentStatus = (dueDate, isPaid) => {
        if (isPaid) return 'paid';

        const daysRemaining = getDaysRemaining(dueDate);

        if (daysRemaining < 0) return 'overdue';
        if (daysRemaining <= 3) return 'due-soon';
        return 'upcoming';
    };

    // Función para añadir una nueva factura
    const handleAddBill = (newBill) => {
        setBillsList(prevBills => [...prevBills, newBill]);
    };

    // Función para abrir el formulario
    const openAddForm = () => {
        setShowAddForm(true);
    };

    // Función para cerrar el formulario
    const closeAddForm = () => {
        setShowAddForm(false);
    };

    return (
        <div className="upcoming-bills-container">
            <div className="section-header">
                <h2>Próximos Pagos</h2>
            </div>

            <div className="bills-list">
                {billsList.length === 0 ? (
                    <div className="no-bills">No hay pagos pendientes</div>
                ) : (
                    billsList.map((bill) => {
                        const status = getPaymentStatus(bill.dueDate, bill.isPaid);
                        const daysRemaining = getDaysRemaining(bill.dueDate);

                        return (
                            <div key={bill.id} className="bill-item">
                                <div className="bill-icon" style={{ backgroundColor: bill.color || '#e6f7ee' }}>
                                    {bill.icon || '📝'}
                                </div>
                                <div className="bill-details">
                                    <div className="bill-name">{bill.name}</div>
                                    <div className="bill-due-date">Vence: {formatDate(bill.dueDate)}</div>
                                </div>
                                <div className="bill-info">
                                    <div className="bill-amount">{formatCurrency(bill.amount)}</div>
                                    <div className={`bill-status ${status}`}>
                                        {status === 'paid' && 'Pagado'}
                                        {status === 'overdue' && 'Vencido'}
                                        {status === 'due-soon' && `En ${daysRemaining} días`}
                                        {status === 'upcoming' && `En ${daysRemaining} días`}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <div className="add-bill">
                <button className="btn" onClick={openAddForm}>+ Añadir Pago</button>
            </div>

            {showAddForm && <AddBillForm onAddBill={handleAddBill} onCancel={closeAddForm} />}
        </div>
    );
};

export default UpcomingBills;