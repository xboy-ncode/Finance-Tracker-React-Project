import React, { useState } from 'react';

const AddBillForm = ({ onAddBill, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        dueDate: '',
        icon: '📝',
        color: '#e6f7ee'
    });

    const icons = ['📝', '🏠', '💡', '💧', '📱', '🚗', '💻', '📺', '🔌', '🏥'];
    const colors = ['#e6f7ee', '#e8f4fd', '#fff8e1', '#f5e6ff', '#ffe9e9', '#e6f2ff', '#fff0e6', '#e6ffe6'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();

        // Validate form
        if (!formData.name || !formData.amount || !formData.dueDate) {
            alert('Por favor complete todos los campos obligatorios');
            return;
        }

        // Create new bill object
        const newBill = {
            id: Date.now().toString(),
            name: formData.name,
            amount: parseFloat(formData.amount),
            dueDate: formData.dueDate,
            icon: formData.icon,
            color: formData.color,
            isPaid: false
        };

        onAddBill(newBill);
        onCancel(); // Close form after submit
    };

    // Close form when clicking outside
    const handleOverlayClick = (e) => {
        if (e.target.className === 'add-bill-form-overlay') {
            onCancel();
        }
    };

    return (
        <div className="add-bill-form-overlay" onClick={handleOverlayClick}>
            <div className="add-bill-form">
                <h3>Añadir Nuevo Pago</h3>

                <div className="form-container">
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ej: Luz, Agua, Internet..."
                        />
                    </div>

                    <div className="form-group">
                        <label>Importe (€)</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                        />
                    </div>

                    <div className="form-group">
                        <label>Fecha de Vencimiento</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Icono</label>
                        <div className="icon-selector">
                            {icons.map(icon => (
                                <div
                                    key={icon}
                                    className={`icon-option ${formData.icon === icon ? 'selected' : ''}`}
                                    onClick={() => setFormData(prev => ({ ...prev, icon }))}
                                >
                                    {icon}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Color</label>
                        <div className="color-selector">
                            {colors.map(color => (
                                <div
                                    key={color}
                                    className={`color-option ${formData.color === color ? 'selected' : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setFormData(prev => ({ ...prev, color }))}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-cancel" onClick={onCancel}>Cancelar</button>
                        <button type="button" className="btn btn-save" onClick={handleSubmit}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBillForm;