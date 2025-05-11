import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import './MonthlyBalanceChart.css';

// Registrar los componentes de Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const MonthlyBalanceChart = ({ data }) => {
    // Formatear los datos para el gráfico
    const chartData = {
        labels: data.map(item => item.month),
        datasets: [
            {
                label: 'Ingresos',
                data: data.map(item => item.income),
                backgroundColor: 'rgba(39, 174, 96, 0.7)',
                borderColor: 'rgba(39, 174, 96, 1)',
                borderWidth: 1,
            },
            {
                label: 'Gastos',
                data: data.map(item => item.expenses),
                backgroundColor: 'rgba(231, 76, 60, 0.7)',
                borderColor: 'rgba(231, 76, 60, 1)',
                borderWidth: 1,
            }
        ],
    };

    // Opciones para el gráfico
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return new Intl.NumberFormat('es-ES', {
                            style: 'currency',
                            currency: 'EUR',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                        }).format(value);
                    }
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    boxWidth: 12,
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.dataset.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${new Intl.NumberFormat('es-ES', {
                            style: 'currency',
                            currency: 'EUR'
                        }).format(value)}`;
                    }
                }
            }
        }
    };

    return (
        <div className="monthly-balance-chart">
            <div className="section-header">
                <h2>Balance Mensual</h2>
            </div>
            <div className="chart-wrapper">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default MonthlyBalanceChart;