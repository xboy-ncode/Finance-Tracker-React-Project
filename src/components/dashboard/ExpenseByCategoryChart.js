import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
} from 'chart.js';
import './ExpenseByCategoryChart.css';

// Registrar los componentes de Chart.js
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
);

const ExpenseByCategoryChart = ({ data }) => {
    // Generar colores para cada categoría
    const generateColors = (count) => {
        const baseColors = [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(199, 199, 199, 0.7)',
            'rgba(83, 102, 255, 0.7)',
            'rgba(40, 159, 64, 0.7)',
            'rgba(210, 199, 199, 0.7)',
        ];

        const colors = [];
        for (let i = 0; i < count; i++) {
            colors.push(baseColors[i % baseColors.length]);
        }

        return colors;
    };

    // Preparar los datos para el gráfico
    const chartData = {
        labels: data.map(item => item.category),
        datasets: [
            {
                data: data.map(item => item.amount),
                backgroundColor: generateColors(data.length),
                borderColor: 'white',
                borderWidth: 1,
            },
        ],
    };

    // Opciones para el gráfico
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    boxWidth: 12,
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = Math.round((value / total) * 100);
                        return `${label}: ${new Intl.NumberFormat('es-ES', {
                            style: 'currency',
                            currency: 'EUR'
                        }).format(value)} (${percentage}%)`;
                    }
                }
            }
        }
    };

    return (
        <div className="expense-category-chart">
            <div className="section-header">
                <h2>Gastos por Categoría</h2>
            </div>
            <div className="chart-wrapper">
                <Pie data={chartData} options={options} />
            </div>
        </div>
    );
};

export default ExpenseByCategoryChart;